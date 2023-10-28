import React from "react";
import profile_classes from "../Dialogs.module.css"
import {DataMessagesArrType, MessagesPageType} from "../../redux/Store";


const Message = (props: DataMessagesArrType) => {
    return (
        <div>
            <div className={profile_classes.message}>{props.message}</div>
            <div> {props.message} </div>
        </div>
    )
}

export default Message