import header_classes from "./Header.module.css"
import React from "react";
import "../../App.css";
import {NavLink} from "react-router-dom";

function Header(props : any) {
    return (
        <header className={header_classes.header}>
            <div className={header_classes.header_container}>
                <div className={header_classes.header_main_image}>
                    <img src="https://f.hubspotusercontent30.net/hubfs/2235233/blog-import/2020/20-08-Aug/sm-icons-facebook-logo.png" alt=""/>
                </div>
                <div className={header_classes.header_searchbar}>
                    <input type="text" placeholder="Search Facebook"/>
                </div>

                { props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={"/login"}> Login  </NavLink>}
            </div>
        </header>
    )
}

export default Header;