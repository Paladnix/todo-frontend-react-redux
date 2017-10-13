import React from 'react';
import {view as Todos} from './todos/';  
import {view as Filter} from './filter/'; 


function TodoApp() {
  return (
    <div className="body">
          <Todos />
          <Filter />
    </div>
  );
}

export default TodoApp
