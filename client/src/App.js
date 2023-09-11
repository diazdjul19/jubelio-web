import React, { Fragment } from "react";
import "./App.css";

//components

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import ListProducts from "./components/products/listProducts";
function App() {
  return (
    <Fragment>
      <div className="container">
        <ListProducts />
      </div>
    </Fragment>
  );
}

export default App;
