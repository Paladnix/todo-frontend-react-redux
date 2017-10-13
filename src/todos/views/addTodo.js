import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

import {postTodo, putTodo} from '../actions.js';

class AddTodo extends Component {

  constructor(props, context) {
    super(props, context);

    this.input ={};
    this.onSubmit = this.onSubmit.bind(this);
    this.inputDescription = this.inputDescription.bind(this);
    this.inputExpire = this.inputExpire.bind(this);
    this.inputPriority = this.inputPriority.bind(this);
  }

  onSubmit(ev) {
    ev.preventDefault();

    if (!this.input.description.trim()) {
      return;
    }

    this.props.onAdd(this.input);
    this.input= {};
  }

  inputDescription(event) {
      this.input.description = event.target.value;
  }
  inputExpire(event) {
      this.input.expire =   event.target.value;
  }
  inputPriority(event) {
      this.input.priority = event.target.value;
  }

    render(){
        return (
                <div className="well tab-content"> 
                    <form className="form-horizontal" noValidate onSubmit={this.onSubmit}>
                        <fieldset>
                            <div className="form-group ">
                                <label className="col-sm-2 control-label ">Description</label>
                                <div className="col-sm-10">
                                    <input className="form-control" type="text"  onChange={this.inputDescription} />
                                </div>
                            </div>

                            <div className="form-group ">
                                <label className="col-sm-2 control-label ">Expire</label>
                                <div className="col-sm-10">
                                    <input className="form-control" type="datetime-local" onChange={this.inputExpire} />
                                </div>
                            </div>

                            <div className="form-group ">
                                <label className="col-sm-2 control-label ">Priority</label>
                                <div className="col-sm-10">
                                    <input className="form-control" type="number" onChange={this.inputPriority} />
                                </div>  
                            </div>
                        </fieldset>
                        <button className="add-btn" type="submit">
                            添加
                        </button>
                    </form>
                </div>
        );
    }
}

AddTodo.propTypes = {
  onAdd: PropTypes.func.isRequired
};


const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (data) => {
      dispatch(postTodo(data));
    },
      onUpdate: (data) => {
          dispatch(putTodo(data));
      }
  }
};

export default connect(null, mapDispatchToProps)(AddTodo);

