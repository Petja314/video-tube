import React from 'react';
import {authAPI} from "../../api/Api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA'

export type SetUserAuthType = {
    type: string,
    payload: {
        userId: string,
        login: string,
        email: string,
        isAuth: boolean,

    },
}
export type CaptchaIsRequiredType = {
    type: "SET_CAPTCHA",
    payload: {
        url: string;
        isRequired: boolean;
    };
}

export type AuthState = {
    id: string | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
    captchaUrl: string | null;
    isCaptchaRequired: boolean
}

let initialState: AuthState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    isCaptchaRequired: false
}
export type LoginAction = (email: string, password: string, rememberMe: boolean) => void;

export type ActionUsersReducerType = SetUserAuthType | CaptchaIsRequiredType | ReturnType<typeof resetAuthUserData>;


export const AuthReducer = (state = initialState, action: ActionUsersReducerType): AuthState => {
    switch (action.type) {
        case SET_USER_DATA :
            return {
                ...state,
                ...action.payload,
                id: action.payload.userId
            };
        // case "SET_CAPTCHA":
        //     return {
        //         ...state,
        //         captchaUrl: action.payload.url,
        //         isCaptchaRequired: action.payload.isRequired
        //     };
        default:
            return state;
    }
};

//ACTION CREATORS - AC
// export const setCaptcha = (url: string, isRequired: boolean) => {
//     return {
//         type: "SET_CAPTCHA",
//         payload: {
//             url,
//             isRequired
//         }
//     } as SetUserAuthType;
// }
// export const fetchCaptcha = () => (dispatch: any) => {
//     authAPI.captcha()
//         .then(response => {
//             if (response.data.url) {
//                 dispatch(setCaptcha(response.data.url, true))
//             }
//         })
// }

export const setAuthUsersDataAC = (userId: string, login: string, email: string, isAuth: boolean): SetUserAuthType => {
    return {
        type: SET_USER_DATA,
        payload: {userId, login, email, isAuth},
    }
}
export const resetAuthUserData = () => {
    return {
        type: SET_USER_DATA,
        payload: {userId: null, login: null, email: null, isAuth: false}
    }
}

export const getAuthUserData = () => async (dispatch: any) => {
       let response = await authAPI.me()
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data
                dispatch(setAuthUsersDataAC(id, login, email, true))
            }
}
export const login = (email: any, password: any, rememberMe: any): LoginAction => async (dispatch: any) => {
   let response = await authAPI.login(email, password, rememberMe)
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                dispatch(stopSubmit('login', {_error: message}))
            }
}
export const logout = () => async  (dispatch: any) => {
   let response = await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(resetAuthUserData())
            }
}


export default AuthReducer

