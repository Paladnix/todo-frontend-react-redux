import {ADD_TODO, TOGGLE_TODO, REMOVE_TODO, LIST_TODO, UPDATE_TODO, PRIORITY_SORT, EXPIRE_SORT} from './actionTypes.js';

const HOST = "http://localhost:8000/";

export const sortPriority = () =>({
    type: PRIORITY_SORT,
});
export const sortExpire = () =>({
    type: EXPIRE_SORT,
});

export const updateTodo = (id) => ({
    type : UPDATE_TODO,
    id : id
});

export const listTodo = (text) => ({
    type : LIST_TODO,
    value : text
});

export const addTodo = (data) => ({
  type: ADD_TODO,
  id : data.id,
  status: data.status,
  description: data.description,
    priority: data.priority,
    expire: data.expire
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id: id
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  id: id
});

export const postTodo = (data) => {
    return (dispatch) => {
        const url = HOST + "task/";

        let formData = new FormData();
        formData.append("username" , "paladnix@outlook.com");
        formData.append("description" , data.description );
        formData.append("expire" , data.expire );
        formData.append("priority" , data.priority );

        const request = {
            method: "POST",
            mode: 'cors',
            headers: {},
            body: formData
        };

        fetch(url, request).then((response) => {
            console.log(response);
            if(response.status !== 201){
               // failed.
               throw new Error('failed to post data from '+ url);
            }
            // success.
            response.json().then( (data) => {
                dispatch(addTodo(data));
            })
        });
    }
}
export const getTodo = () => {
    return (dispatch) => {
        const url = HOST + "task/";
        const data = {
        /*    'username' : 'paladnix@outlook.com', */
        };
        const request = {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': "application/json",
            },
            body: data
        };

        fetch(url, request).then( (response) => {
            
            console.log(response);
            if(response.status !== 200){
               // failed.
               throw new Error('failed to request data from '+ url);
            }
            // success.
            response.json().then( (data) => {
                console.log(data);
                dispatch( listTodo( data) );

            });
            
        });
    }
}

export const putTodo = ( id ) => {
    return (dispatch, getState) => {
        const url = HOST + "task/" + id + "/";

        const item = getState().todos.filter( (todoItem) => {return todoItem.id === id} )[0];
        console.log(item);

        let formData = new FormData();
        formData.append("username" , "paladnix@outlook.com");
        formData.append("description" , item.description );
        formData.append("status" , item.status === "TODO"?"DOWN":"TODO");

        const request = {
            method: "PUT",
            mode: 'cors',
            headers: {},
            body: formData
        };

        fetch(url, request).then((response) => {
            console.log(response);
            if(response.status !== 200 ){
               // failed.
               throw new Error('failed to post data from '+ url);
            }
            // success.
            response.json().then( (data) => {
                console.log("the item : " + id);
                dispatch( toggleTodo(id));
            })
        });
        
    }
}
export const deleteTodo = (id) => {
    return (dispatch) => {
        const url = HOST + "task/"+id+"/";

        const request = {
            method: "DELETE",
            mode: 'cors',
            headers: {},
            body: {}
        };

        fetch(url, request).then((response) => {
            console.log(response);
            if(response.status !== 204){
               // failed.
               throw new Error('failed to post data from '+ url);
            }
            // success.
            console.log("the item will be removed : " + id);
            dispatch( removeTodo( id ) );
        });
    }
}
