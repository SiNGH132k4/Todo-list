import { useEffect, useRef, useState } from 'react';
import './CSS/Todo.css';
import TodoItems from './TodoItems';

let count = 0;  // fix: declare count

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const inpRef = useRef(null);
    const btnRef = useRef(null);

    const add = () => {
        const text = inpRef.current.value.trim();
        if (!text) return; // prevent empty todos
        const newTodo = { no: count++, text, display: "" };
        const updatedTodos = [newTodo, ...todos];
        setTodos(updatedTodos);
        inpRef.current.value = '';
        localStorage.setItem('todos_count', count);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        const savedCount = parseInt(localStorage.getItem('todos_count')) || 0;
        setTodos(savedTodos);
        count = savedCount;
    }, []);

    return (
        <div className="todo">
            <div className="todo-header">TODO LIST</div>
            <div className="todo-add">
                <input
                    ref={inpRef}
                    type="text"
                    placeholder="Add Your Todo"
                    className="todo-input"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            btnRef.current.click();
                        }
                    }}
                />
                <div ref={btnRef} onClick={add} className="todo-add-btn">ADD</div>
            </div>
            <div className="todo-list">
                {todos.map((item) => (
                    <TodoItems
                        key={item.no}
                        setTodos={setTodos}
                        no={item.no}
                        display={item.display}
                        text={item.text}
                    />
                ))}
            </div>
        </div>
    );
};

export default Todo;
