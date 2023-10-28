import React from 'react';
import store, {
    PostsArrType,
} from "./Store";
import {profileAPI} from "../../api/Api";

export type ProfileStateTypes = {
    newPostText: string,
    posts: ProfilePostsArrType[],
    status?: string
}
export type ProfilePostsArrType = {
    message: string, id: string, likesCount: number

}
export type AddPostAT = {
    type: string
    value: any
}
export type UserProfileAT = {
    type: string,
    profile: any
}
export type UserStatusAT = {
    type: string,
    status: string
}

const ADD_POST = 'samurai-network/ProfileReducer/ADD_POST'
const SET_USER_PROFILE = 'samurai-network/ProfileReducer/SET_USER_PROFILE'
const SET_STATUS = 'samurai-network/ProfileReducer/SET_STATUS'

export type ActionProfileReducerType = AddPostAT | UserProfileAT | UserStatusAT


let initialState: ProfileStateTypes = {
    newPostText: 'it-kamasutra.com',
    posts: [
        {"message": "It is my first post1", "id": "1", "likesCount": 15},
        {"message": "It is my second post2", "id": "2", "likesCount": 153},
    ] as PostsArrType[],// Add the type assertion to ensure 'posts' is always an array of 'PostsArrType',
    status: ""

};

export const ProfileReducer = (state = initialState, action: ActionProfileReducerType) => {
    switch (action.type) {
        case ADD_POST:
            let body   = (action as AddPostAT).value // action.value
            const maxId = Math.max(...state.posts.map(post => parseInt(post.id, 10)));
            const newId = (maxId + 1).toString();
            const randomLikesCount = Math.floor(Math.random() * 100);
            return {
                ...state,
                posts: [...state.posts, {message: body, id: newId, "likesCount": randomLikesCount}]
            }
        case SET_USER_PROFILE :
            return {...state, profile: (action as UserProfileAT).profile} // profile : action.profile
        case SET_STATUS :
            return {...state, status: (action as UserStatusAT).status} // status : action.status
        default:
            return state;
    }
};

export const addNewPostAction = (value: string): AddPostAT => {
    return {
        type: ADD_POST,
        value
    }
}
export const setUserProfileAction = (profile: any): UserProfileAT => {
    return {
        type: SET_USER_PROFILE,
        profile: profile
    }
}
export const setStatusAction = (status: any): UserStatusAT => {
    return {
        type: SET_STATUS,
        status: status
    }
}


export const usersProfileAuthThunkCreator = (userId: any)   => async (dispatch: any) => {
        if (!userId) {
            userId = 2
        }
        let response = await profileAPI.profileAuth(userId)
                dispatch(setUserProfileAction(response.data));
}

export const getStatusThunkCreator = (userID: any) => async  (dispatch: any) => {
   let response = await profileAPI.getStatus(userID)
            dispatch(setStatusAction(response.data))
}

export const updateStatusThunkCreator = (status: any) => async  (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
            if (response.data.rusltCode === 0) {
                dispatch(setStatusAction(response.data))
            }
}
