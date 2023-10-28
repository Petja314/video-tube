import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../assets/images/louie.jpg";
import { UsersComponentTypeArrays} from "../redux/UsersReducer";
import {NavLink} from "react-router-dom";
import PaginationUsers from "./PaginationUsers";

export type UsersTypeToProps = {
    totalUsersCount : any
    pageSize : any
    currentPage : any
    onPageChange : (pageNumber : any) => void
    usersPage : UsersComponentTypeArrays,
    follow : (userID : any) => void,
    unfollow : (userID : any) => void,
    followingInProgress : any,
    setFollowingProgress : (isFetching : boolean , userID : any) => void,
    unfollowUserThunkCreator : (id : any) => void
    followUserThunkCreator : (id : any) => void

    incrementPage: (currentPage : any) => void

}
const Users = (props : UsersTypeToProps) => {
    return (
        <div>
            <div>
                <PaginationUsers
                    totalUsersCount={props.totalUsersCount}
                    pageSize={props.pageSize}
                    onPageChange={props.onPageChange}
                    incrementPage={props.incrementPage}
                    currentPage={props.currentPage}
                />



            </div>
            {
                props.usersPage.users.map((item : any )=>
                    <div key={item.id}>
                    <span>

                        <NavLink  to={'/profile/' +item.id}>
                        <div><img src={item.photos.small !== null ? item.photos.small : userPhoto} className={styles.usersPhoto}/></div>
                        </NavLink>

                        <div>
                            {item.followed
                                ? <button disabled={props.followingInProgress.some((id: any) => id === item.id)} onClick={() => {
                                    props.unfollowUserThunkCreator(item.id)
                                    }}>Unfollow</button>

                                : <button disabled={props.followingInProgress.some((id: any) => id === item.id)}  onClick={() => {
                                    props.followUserThunkCreator(item.id)
                                }}> Follow </button> }

                        </div>
                    </span>
                        <span>
                        <span>
                            <div>{item.name}</div>
                            <div>{item.status}</div>
                        </span>
                    </span>
                    </div>)}
        </div>
    );
};

export default Users;