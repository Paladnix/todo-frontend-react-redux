import {PropTypes} from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import TodoItem from './todoItem.js';
import {putTodo, getTodo, deleteTodo, updateTodo, sortPriority, sortExpire} from '../actions.js';
import {FilterTypes} from '../../constants.js';

/*
 * the args here are important:
 *      todos : list
 *      onToggleTodo : func
 *      omRemoveTodo : func
 */ 

class TodoList extends Component  {
/*
    constructor(props, context) {
        super(props, context);
    }
*/
    componentDidMount(){
        this.props.getTodo();
    }


    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Down</th>
                        <th onClick={this.props.onSortPriority()} >Priority</th>
                        <th>Description</th>
                        <th onClick={this.props.onSortExpire()}>Expire</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
            {
                this.props.todos.map((item) => (
                    <TodoItem
                        key = {item.id}
                        item={item}
                        onToggle={() => this.props.onToggleTodo(item.id)}
                        onRemove={() => this.props.onRemoveTodo(item.id)}
                        onUpdate={() => this.props.onUpdateTodo(item.id)}
                    />
                ))
            }
                </tbody>
            </table>
        );
    }

}


TodoList.propTypes = {
    todos: PropTypes.array.isRequired
};

const selectVisibleTodos = (todos, filter) => {
    switch (filter) {
    case FilterTypes.ALL:
        return todos;
    case FilterTypes.COMPLETED:
        return todos.filter(item => item.status === "DOWN" );
    case FilterTypes.UNCOMPLETED:
        return todos.filter(item => item.status === "TODO");
    default:
        throw new Error('unsupported filter');
    }
}
/*
 *  this func use to combine the data in the state to the this.props.todos;
 *  state has been filtrated by func selectVisibleTodos();
 */ 
const mapStateToProps = (state) => {
    return {
        todos: selectVisibleTodos(state.todos, state.filter)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleTodo: (id) => {
            dispatch(putTodo(id));
        },
        onRemoveTodo: (id) => {
            dispatch(deleteTodo(id));
        },
        getTodo: () => {
            dispatch(getTodo());
        },
        onUpdateTodo: (id) => {
            dispatch(updateTodo(id));
        },
        onSortPriority: () => {
            dispatch(sortPriority());
        },
        onSortExpire: () => {
            dispatch(sortExpire());
        }
    };
};

/*
const mapDispatchToProps = (dispatch) => bindActionCreators({
  onToggleTodo: toggleTodo,
  onRemoveTodo: removeTodo
}, dispatch);
*/

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

