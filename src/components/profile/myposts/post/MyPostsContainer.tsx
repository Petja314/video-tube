import React from 'react';
import MyPosts from "../Myposts";
import {PostsProfilePageType} from "../../../redux/Store";
import {addNewPostAction} from "../../../redux/ProfileReducer"
import {Dispatch} from "redux";
import {connect} from "react-redux";

export type MapStatePropsType = {
    profilePage: PostsProfilePageType
}
export type MapDispatchPropsType = {
    addPost: (value : any) => void
}
let mapStateToProps = (state: any): MapStatePropsType => {
    // console.log(state.profilePage.posts)

    return {
        profilePage: state.profilePage
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (value : any) => {
            dispatch(addNewPostAction(value))
        }
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}>(
    mapStateToProps,
    mapDispatchToProps
)(MyPosts);





