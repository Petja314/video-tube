import React from 'react';
import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    setToggleFetching,
    setUsers,
    unfollow,
    setTotalUsersCount,
    UsersComponentTypeArrays, setFollowingProgress, getUsersThunkCreator, followUserThunkCreator, unfollowUserThunkCreator, incrementCurrentPageButton
} from "../redux/UsersReducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {compose} from "redux";
import {WithAuthRedirect} from "../hoc/WithAuthRedirect";
import {getCurrentPageSelector, getFollowingInProgressSelector, getIsFetchingSelector, getPageSizeSelector, getTotalUsersCountSelector, getUsersPageSelector} from "../redux/UsersSelectors";

class UsersAPIComponent extends React.Component<any, any>{
    componentDidMount() {
        // this.props.getUsersThunkCreator()
        this.props.getUsersThunkCreator(this.props.currentPage ,this.props.pagesize)
        // this.props.incCurrentPageThunk(this.props.currentPage ,this.props.pagesize)

        // this.props.setToggleFetching(true)
        // usersAPI.getUsers(this.props.currentPage ,this.props.pagesize ).then(data => {
        //         this.props.setToggleFetching(false)
        //         this.props.setUsers(data.items);
        //         this.props.setTotalUsersCount(data.totalCount);
        //     })
    }

    onPageChange = (pageNumber : UsersComponentTypeArrays) => {
        this.props.getUsersThunkCreator(pageNumber ,  this.props.pagesize)
    }
    incrementPage = (currentPage : UsersComponentTypeArrays) => {
        // this.props.incCurrentPageThunk(currentPage ,this.props.pagesize)
    }


    render() {
        return (
            <div>
                <Preloader isFetching={this.props.isFetching} />
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChange={this.onPageChange}
                    usersPage={this.props.usersPage}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                    setFollowingProgress={this.props.setFollowingProgress}
                    unfollowUserThunkCreator={this.props.unfollowUserThunkCreator}
                    followUserThunkCreator={this.props.followUserThunkCreator}

                    incrementPage={this.incrementPage}
                />
            </div>
        );
    }
}

export type UsersPageProps = {
    usersPage : UsersComponentTypeArrays,
    pageSize : number,
    totalUsersCount : number,
    currentPage  : number,
    isFetching : boolean,
    followingInProgress : boolean
}
// let mapStateToProps= (state : any ) : UsersPageProps => {
//     return {
//         usersPage : state.usersPage,
//         pageSize : state.usersPage.pageSize,
//         totalUsersCount : state.usersPage.totalUsersCount,
//         currentPage : state.usersPage.currentPage,
//         isFetching : state.usersPage.isFetching,
//         followingInProgress : state.usersPage.followingInProgress
//     }
// }

let mapStateToProps= (state : any ) : UsersPageProps => {
    return {
        usersPage : getUsersPageSelector(state),
        pageSize : getPageSizeSelector(state),
        totalUsersCount : getTotalUsersCountSelector(state),
        currentPage : getCurrentPageSelector(state),
        isFetching : getIsFetchingSelector(state),
        followingInProgress : getFollowingInProgressSelector(state)
    }
}

export default compose(
    connect (mapStateToProps,{
        follow , unfollow ,setUsers ,
        setCurrentPage ,setTotalUsersCount ,
        setToggleFetching ,  setFollowingProgress ,
        getUsersThunkCreator , unfollowUserThunkCreator , followUserThunkCreator ,
        incrementCurrentPageButton
    }) ,
    WithAuthRedirect

)(UsersAPIComponent)