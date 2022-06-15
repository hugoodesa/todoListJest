import React, { useEffect, useState } from "react";
import { useTodoList } from "../hooks/useListaParticipantes";

type Props = {
  todos?: string[];
};

export const ListComponent: React.FC<Props> = (): JSX.Element => {

  const [todos, setTodoList] = useTodoList();

  const handleButton = (idxToRemove:number) => {
    let newStateList = [...todos]
    newStateList = newStateList.filter((todo,idx)=>idx!==idxToRemove)
    setTodoList(newStateList)
  }

  const applyStyle = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.currentTarget.setAttribute("class", "list-group-item active");
  };

  const removeStyle = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.currentTarget.setAttribute("class", "list-group-item");
  };

  const renderList = () => {
    return todos.map((todo,idx)=>{
      return (
        <li className="list-group-item" onMouseOver={applyStyle} onMouseLeave={removeStyle} key={idx}>
          {todo}
          <button data-testid="deleteButton" className="btn btn-danger" onClick={e=>handleButton(idx)}>Remove todo</button>
        </li>
      )
    })
  }

  return (
    <ul data-testid="todoList" className="list-group">
      {renderList()}
    </ul>);
};

export const FormComponent: React.FC = (): JSX.Element => {
  const [sayHellow, setSayHellow] = useState<boolean>(true);
  const [todo, setTodo] = useState<string>("");
  const [list, setTodoList] = useTodoList();

  const handleSayHellow = (): void => {
    setTimeout(() => {
      setSayHellow(false);
    }, 3000);
  };

  useEffect(() => {
    handleSayHellow();
  }, []);

  const handleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTodo(value);
  };

  const handleButton = () => {
    const newStateList = [...list, todo];
    setTodoList(newStateList);
  };

  return (
    <div className="default">
      {sayHellow && (
        <div data-testid="welcome" className="alert alert-primary" role="alert">
          Welcome Sir!
        </div>
      )}

      <div className="mb-3">
        <label
          style={{ color: "whitesmoke" }}
          htmlFor="exampleInputEmail1"
          className="form-label"
        >
          Insert your todo
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="type your todo"
          value={todo}
          onChange={handleTodo}
        />
      </div>

      <button
        onClick={handleButton}
        type={"button"}
        className="btn btn-primary"
        style={{ marginBottom: "20px" }}
      >
        Submit
      </button>

      <ListComponent todos={list} />
    </div>
  );
};
