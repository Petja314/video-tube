import React from 'react';

const ADD_MESSAGE = 'samurai-network/dialogs_reducer/ADD-MESSAGE'

export type AddMessageReduxAT = {
    type: string
    value : any
}

export type ActionDialogsReducerType =   AddMessageReduxAT

 const initialState = {
    dialogs_data: [
        {"image": "https://img.freepik.com/free-icon/user_318-159711.jpg", "name": "Dimon", "id": "1"},
        {"image": "https://img.freepik.com/free-icon/user_318-159711.jpg", "name": "Vasya", "id": "2"},
        {"image": "https://img.freepik.com/free-icon/user_318-159711.jpg", "name": "Fara", "id": "3"},
        {"image": "https://img.freepik.com/free-icon/user_318-159711.jpg", "name": "Mara", "id": "4"},
        {"image": "https://img.freepik.com/free-icon/user_318-159711.jpg", "name": "Viktor", "id": "5"},
        {"image": "https://img.freepik.com/free-icon/user_318-159711.jpg", "name": "Valeriya", "id": "6"}
    ],
    data_messages: [
        {"message": "hi", "answer": "my name"},
        {"message": "hello", "answer": "my surname"},
        {"message": "hey", "answer": "my azziz"},
    ],
    newData_messages : [
        {"message" : "one","answer" : "one"}
    ]
}

export const DialogsReducer = (state = initialState, action: ActionDialogsReducerType) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let body = action.value
            return{
                ...state,
                data_messages: [...state.data_messages, {message: body ,  answer: "random"}]
            }
        default:
            return state;
    }
};

export const addMessageAction = (value : any): AddMessageReduxAT => {
    return {
        type: ADD_MESSAGE,
        value : value
    }
}
export default DialogsReducer

