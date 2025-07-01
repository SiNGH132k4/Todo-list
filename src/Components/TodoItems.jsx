import './CSS/TodoItems.css';
import tick from './Assets/tick.png';
import cross from './Assets/cross.png';
import not_tick from './Assets/not_tick.png';

const TodoItems = ({ no, display, text, setTodos }) => {
    const deleteTodo = (no) => {
        setTodos((prev) => {
            const newData = prev.filter((todo) => todo.no !== no);
            localStorage.setItem('todos', JSON.stringify(newData));
            return newData;
        });
    };

    const toggle = (no) => {
        setTodos((prev) => {
            const newData = prev.map((todo) =>
                todo.no === no
                    ? { ...todo, display: todo.display === "" ? "line-through" : "" }
                    : todo
            );
            localStorage.setItem('todos', JSON.stringify(newData));
            return newData;
        });
    };

    return (
        <div className="todoitems">
            <div className={`todoitems-container ${display}`}>
                <img
                    onClick={() => toggle(no)}
                    src={display === "" ? not_tick : tick}
                    alt=""
                    className="todoitems-checkbox"
                />
                <div className="todoitems-text">{text}</div>
            </div>
            <img
                className="todoitems-cross"
                onClick={() => deleteTodo(no)}
                src={cross}
                alt=""
            />
        </div>
    );
};


export default TodoItems
