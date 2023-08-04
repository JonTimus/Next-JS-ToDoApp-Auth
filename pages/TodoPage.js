import React, { useState, useEffect } from 'react'

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isEditing, setIsEditing] = useState({});
  const [titleBeforeEdit, setTitleBeforeEdit] = useState("");  // store curTitle before Editing, so we can click C

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/todos")
  //     .then((res) => res.json())
  //     .then((todos) => setTodos(todos));
  // }, []);

  function addHandler(e) {
    e.preventDefault();

    if (todos.length === 0) {
      const fristTodo = {
        userId: 1,
        id: 1,
        title: newTodo,
        completed: false,
      }
      const newTodos = [...todos, fristTodo];
      setTodos(newTodos);
    
    } else {
      setTodos((prev) => {
        return [...prev, {
            userId: prev[prev.length - 1].userId,
            id: prev[prev.length - 1].id + 1,
            title: newTodo,
            completed: false
          }
        ];
      });
    }
  }

  function deleteHandler(todoId) {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== todoId);
    });
  }

  function editHandler(todoId, curTodoTitle) {
    setTitleBeforeEdit(curTodoTitle);  // store curTitle
    setIsEditing((prevIsEditing) => ({ ...prevIsEditing, [todoId]: true }));
  }

  function saveHandler(todoId, newTitle) {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, title: newTitle };
        }
        return todo;
      })
    );
    setIsEditing((prevIsEditing) => ({ ...prevIsEditing, [todoId]: false }));
  }

  function cancelHandler(todoId) {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, title: titleBeforeEdit };
        }
        return todo;
      })
    );
    setIsEditing((prevIsEditing) => ({ ...prevIsEditing, [todoId]: false }));
  }

  function toggleHandler(todoId) {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  }

  console.log(todos);

  return (
    <div className='todolist-container place-content-center'>
      <form onSubmit={addHandler}>
        <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button type="submit">ADD</button>
      </form>
      <div className='place-content-center'>
        {todos.map((todo, idx) => (
          <div key={idx}>
            <div>{todo.id}</div>

            {isEditing[todo.id] ? (
              <div>
                <input value={todo.title}
									onChange={(e) =>
                    setTodos((prevTodos) =>
                      prevTodos.map((prevTodo) =>
                        prevTodo.id === todo.id ? 
													{ ...prevTodo, title: e.target.value }
                          : prevTodo
                      )
                    )
                  }
                />
                <button onClick={() => saveHandler(todo.id, todo.title)}>SAVE</button>
                <button onClick={() => cancelHandler(todo.id)}>CANCEL</button>
              </div>
            ) : (
              <div>{todo.title}</div>
            )}

            <div>{todo.completed ? "completed" : "not"}</div>
            <div className="todo-actions">
              <button onClick={() => deleteHandler(todo.id)}>DELETE</button>
              <button onClick={() => editHandler(todo.id, todo.title)}>EDIT</button>
              <button onClick={() => toggleHandler(todo.id)}>TOGGLE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}