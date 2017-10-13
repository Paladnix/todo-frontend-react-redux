import {ADD_TODO, TOGGLE_TODO, REMOVE_TODO, LIST_TODO, UPDATE_TODO, PRIORITY_SORT, EXPIRE_SORT} from './actionTypes.js';

export default (state = [], action) => {
  switch(action.type) {
    case ADD_TODO: {
      return [
        ...state,
        {
          id: action.id,
          description: action.description,
          priority: action.priority,
          expire: action.expire,
          status: action.status,
          username: 'paladnix@outlook.com',
        }
      ]
    }
    case TOGGLE_TODO: {
      return state.map( (todoItem) => {
        if (todoItem.id === action.id) {
           return {...todoItem, status: todoItem.status==="DOWN"?"TODO":"DOWN"};
        } else {
          return todoItem;
        }
      })
    }
    case REMOVE_TODO: {
      return state.filter((todoItem) => {
        return todoItem.id !== action.id;
      })
    }
  case LIST_TODO: {
      return action.value;
  }
  case UPDATE_TODO: {
      return state.filter((todoItem)=>{
          return todoItem.id === action.id;
      })
  }
  case PRIORITY_SORT:{
      let data = state;
      return data.sort( (a, b)=>{ console.log(a.priority +" " + b.priority); return b.priority - a.priority; });
  }
  case EXPIRE_SORT:{
      let data = state;
      return data.sort((a,b) => { return a.expire > b.expire; });
  }
    default: {
      return state;
    }
  }
}
