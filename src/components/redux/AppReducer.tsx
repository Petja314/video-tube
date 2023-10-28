import React from 'react';
import {getAuthUserData} from "./AuthReducer";


export type SetUserAuthType = {
    type : "SET_INITIALIZED_SUCCESS",
}

export type AuthState = {
    initialized : boolean,
}

 let initialState: AuthState = {
    initialized : false,
}

export type ActionUsersReducerType = SetUserAuthType


export const AppReducer = (state = initialState, action: ActionUsersReducerType) : AuthState => {
    switch (action.type) {
        case "SET_INITIALIZED_SUCCESS" :
            return {
                ...state ,
                initialized : true
            }

        default:
            return state;
    }
};

//ACTION CREATORS - AC
export const initializedSuccess = (): SetUserAuthType => {
    return {
        type : "SET_INITIALIZED_SUCCESS",
    }
}

export const initializeApp = () => (dispatch : any) : any => {
   let promise =  dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
        dispatch(initializedSuccess())
    })

}

export default AppReducer

