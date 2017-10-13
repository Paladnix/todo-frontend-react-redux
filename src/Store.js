import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as todoReducer} from './todos';
import {reducer as filterReducer} from './filter';
/*
 *  state: {
 *      key : reducer,
 *      ...
 *  }
 *  
 */ 
const reducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer 
});


const middlewares = [thunkMiddleware];
/*
const storeEnhancers = compose(
  applyMiddleware(...middlewares),
);

*/

/*
 * 三个参数：
 *   reducer，
 *   中间是state的初始状态，
 *   使用的中间件
 */
export default createStore(reducer, {}, applyMiddleware(...middlewares))
