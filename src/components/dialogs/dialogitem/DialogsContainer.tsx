import React from 'react';
import Dialogs from "../Dialogs";
import { addMessageAction} from "../../redux/DialogsReducer";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {MessagesPageTypeArrays} from "../../redux/Store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

//TYPES
export type MapStateToPropsType = {
    messagesPage : MessagesPageTypeArrays
}
export type MapDispatchToPropsType = {
    addMessage: (value : any) => void
}
export type DialogsComponentProps = MapStateToPropsType & MapDispatchToPropsType
//TYPES


let mapStateToProps = (state: any) : MapStateToPropsType => {
    return {
        messagesPage : state.messagesPage,
    }
}
let mapDispatchToProps = (dispatch : Dispatch ) : MapDispatchToPropsType => {
    return {
         addMessage : (value : any) => {
            dispatch(addMessageAction(value))
        }
    }
}
export default compose(
    connect<MapStateToPropsType , MapDispatchToPropsType , {}>(
        mapStateToProps,
        mapDispatchToProps
    ),
    WithAuthRedirect
)(Dialogs)
