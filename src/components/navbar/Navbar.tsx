import React from "react";
import classes from "./Navbar.module.css"
import "../../App.css";
import {NavLink} from "react-router-dom";
import {NavType, SideBarType} from "../redux/Store";

export type ProfilePropsType = {
    state: SideBarType
    data: NavType
}

function Navbar(props: ProfilePropsType) {
    const friends_list = props.state.friends.map(item => <div key={item.id}><img src={item.image}/> {item.name} </div>)
    const nav_obj = props.data.nav.map(item => <div className={classes.item} key={item.link}><NavLink to={item.link}>  {item.text} </NavLink></div>)

    return (
        <nav className={classes.nav}>
            <div>
                {nav_obj}
                <div className={classes.friends_container}>
                    <h2 className={classes.item} >Friends</h2>
                    <div className={classes.friends_list}>
                        {friends_list}
                    </div>
                </div>
            </div>
        </nav>


    )
}

export default Navbar;