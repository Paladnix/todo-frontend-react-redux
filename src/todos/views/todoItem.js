import {PropTypes} from 'prop-types';
import React from 'react';

const TodoItem = ({onToggle, onRemove, item, onUpdate}) => {

  const checkedProp = item.status === "DOWN" ? {checked: true} : {};
  return (
    <tr
      style={{
        color:item.status === "DOWN" ? '#AAAAAA' : 'black'
      }}
    >
      <td><input className="toggle" type="checkbox" {...checkedProp} readOnly onChange={onToggle} /> </td>
      <td className="text"> {item.priority} </td>
      <td className="text"> {item.description} </td>
      <td className="text"> {item.expire} </td>
          <td>
      <button className="btn btn-default" onClick={onRemove}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
      <button className="btn btn-primary" onClick={onUpdate}><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>
          </td>
    </tr>
  )
}


TodoItem.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
}

export default TodoItem;
