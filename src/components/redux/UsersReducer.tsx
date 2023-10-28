import React from 'react';
import {usersAPI} from "../../api/Api";

export type  UsersComponentTypeArrays = {
    users: UsersArrayType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: []

}
export type UsersArrayType = {
    "name": string,
    "id": number,
    "uniqueUrlName": boolean,
    "photos": {
        "small": string,
        "large": string
    },
    "status": string,
    "followed": boolean
}
export type followReducerType = {
    type: "FOLLOW"
    userID: number
}
export type unfollowReducerType = {
    type: "UNFOLLOW"
    userID: number
}
export type setUsersReducerType = {
    type: "SET_USERS",
    users: UsersArrayType[]
}
export type setCurrentPageType = {
    type: "CURRENT_PAGE",
    currentPage: string
}
export type setTotalUsersCountType = {
    type: "TOTAL_USERS_COUNTS",
    totalCount: number
}
export type setToggleFetchingType = {
    type: "TOGGLE_IS_FETCHING",
    isFetching: boolean
}
export type setToggleFollowingProgressType = {
    type: "TOGGLE_IS_FOLLOWING_PROGRESS",
    isFetching: boolean,
    userID: any
}

// -----
export type incrementCurrentPageBtnType = {
    type : "INCREMENT_PAGE_BTN",
    currentPage: any
}
// ----

export type ActionUsersReducerType =
    followReducerType
    | unfollowReducerType
    | setUsersReducerType
    | setCurrentPageType
    | setTotalUsersCountType
    | setToggleFetchingType
    | setToggleFollowingProgressType
    | incrementCurrentPageBtnType

const initialState: UsersComponentTypeArrays = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

export const UsersReducer = (state = initialState, action: ActionUsersReducerType) => {
    // console.log(users)
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(item => {
                    if (item.id === action.userID) {
                        return {...item, followed: true}
                    }
                    return item
                })
            }
        case "UNFOLLOW" :
            return {
                ...state,
                users: state.users.map(item => {
                    if (item.id === action.userID) {
                        return {...item, followed: false}
                    }
                    return item
                })
            }
        case "SET_USERS" :
            return {...state, users: action.users}
        // return {...state, users: [...state.users, ...action.users]}
        case "CURRENT_PAGE" :
            return {...state, currentPage: action.currentPage}
        case "TOTAL_USERS_COUNTS" :
            return {...state, totalUsersCount: action.totalCount}
        case "TOGGLE_IS_FETCHING" :
            return {...state, isFetching: action.isFetching}
        case "TOGGLE_IS_FOLLOWING_PROGRESS" :
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id != action.userID)
            }
        case "INCREMENT_PAGE_BTN" :
            return {
                ...state,
                currentPage : action.currentPage
            }
        default:
            return state;
    }
};

//ACTION CREATORS - AC

export const follow = (userID: number): followReducerType => {
    return {
        type: "FOLLOW",
        userID: userID
    }
}

export const unfollow = (userID: number): unfollowReducerType => {
    return {
        type: "UNFOLLOW",
        userID: userID
    }
}
export const setUsers = (users: UsersArrayType[]): setUsersReducerType => {
    return {
        type: "SET_USERS",
        users: users
    }
}

export const setCurrentPage = (currentPage: string): setCurrentPageType => {
    return {
        type: "CURRENT_PAGE",
        currentPage: currentPage
    }
}

export const setTotalUsersCount = (totalCount: number): setTotalUsersCountType => {
    return {
        type: "TOTAL_USERS_COUNTS",
        totalCount: totalCount
    }
}
export const setToggleFetching = (isFetching: boolean): setToggleFetchingType => {
    return {
        type: "TOGGLE_IS_FETCHING",
        isFetching: isFetching
    }
}
export const setFollowingProgress = (isFetching: boolean, userID: any): setToggleFollowingProgressType => {
    return {
        type: "TOGGLE_IS_FOLLOWING_PROGRESS",
        isFetching,
        userID
    }
}

export const incrementCurrentPageButton = (currentPage: any) : incrementCurrentPageBtnType => {
    return {
        type : "INCREMENT_PAGE_BTN",
        currentPage: currentPage
    }
}
// export const incCurrentPageThunk = (currentPage: any, pagesize: any) => {
//     return async (dispatch : any) => {
//         let response = await usersAPI.getUsers(currentPage + 1, pagesize); // Increment the page number by 1
//         dispatch(incrementCurrentPageButton(currentPage + 1)); // Increment the current page in the state
//         dispatch(setUsers(response.data.items));
//         dispatch(setTotalUsersCount(response.data.totalCount));
//     };
// }


export const getUsersThunkCreator = (currentPage: any, pagesize: any) => {
    return async (dispatch: any) => {
        dispatch(setToggleFetching(true))
        let response = await usersAPI.getUsers(currentPage, pagesize)
            dispatch(setToggleFetching(false))
            dispatch(setUsers(response.data.items))
            dispatch(setTotalUsersCount(response.data.totalCount))
            dispatch(setCurrentPage(currentPage))
    }
}
export const unfollowUserThunkCreator = (id : any) => {
    return async (dispatch: any) => {
        dispatch(setFollowingProgress(true,id))
      let response = await  usersAPI.unFollowUser(id)
            if (response.data.resultCode === 0) {
                dispatch(unfollow(id))
            }
            dispatch(setFollowingProgress(false,id))
    }}

export const followUserThunkCreator = (id : any) => {
    return async (dispatch: any) => {
        dispatch(setFollowingProgress(true,id))
        let response = await usersAPI.followUser(id)
            if (response.data.resultCode === 0) {
                dispatch(follow(id))
            }
       dispatch(setFollowingProgress(false,id))
    }}

// FOLLOW UNFOLLOW CODE REFACTORING
// const followUnfollowFlow = async  (dispatch : any,id : any,apiMethod : any,actionCreator : any) =>  {
//     dispatch(setFollowingProgress(true,id))
//     let response = await apiMethod(id)
//     if (response.data.resultCode === 0) {
//         dispatch(actionCreator(id))
//     }
//     dispatch(setFollowingProgress(false,id))
// }
//
// export const unfollowUserThunkCreator = (id : any) => {
//         return async (dispatch: any) => {
//             await followUnfollowFlow(dispatch, id, usersAPI.unFollowUser.bind(usersAPI), unfollow)
//     }}
//
// export const followUserThunkCreator = (id : any) => {
//     return async (dispatch: any) => {
//         await followUnfollowFlow(dispatch, id, usersAPI.followUser.bind(usersAPI), follow)
//     }}

export default UsersReducer

