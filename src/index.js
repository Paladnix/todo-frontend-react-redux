import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import TodoApp from './TodoApp';
import store from './Store';


import './css/style.css';
import './css/bootstrap.css';
import './css/bootstrap-theme.css';
import './css/bootstrap-tweaks.css';

const root = document.getElementById('root');

ReactDOM.render (
                 <Provider store={store} >
                    <TodoApp />
                 </Provider>,
                 root
);


