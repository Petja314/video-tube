import {NavLink} from "react-router-dom";
import React from "react";
import profile_classes from "../Dialogs.module.css"
import {MessagesPageType } from "../../redux/Store";
const DialogItem = (props: MessagesPageType) => {
    let path = "/dialogs/" + props.id;
    return (
        <div>
            <div className={profile_classes.dialog + ' ' + profile_classes.active}>
                <NavLink to={path}> <img src={props.image} alt=""/>  {props.name}</NavLink>
            </div>
        </div>
    )
}

export default DialogItem