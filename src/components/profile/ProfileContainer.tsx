import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatusThunkCreator, setUserProfileAction, updateStatusThunkCreator, usersProfileAuthThunkCreator} from "../redux/ProfileReducer";
import {useParams} from "react-router-dom";
import {WithAuthRedirect} from "../hoc/WithAuthRedirect";
import {compose} from "redux";

export function withRouter(Children: any) {
    return (props: any) => {
        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}

class ProfileContainer extends React.Component<any, any> {
    componentDidMount() {
        let userId = this.props.match.params.id
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.usersProfileAuthThunkCreator(userId)
        this.props.getStatusThunkCreator(userId)

    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatusThunkCreator={this.props.updateStatusThunkCreator}
                />
            </div>

        )
    }

}

let mapStateToProps = (state: any) => ({
    profile: state.profilePage.profile,
    userAuthPage : state.userAuthPage.isAuth,
    status : state.profilePage.status,
    authorizedUserId : state.userAuthPage.userId ,
    isAuth : state.userAuthPage.isAuth
})

export default compose(
    connect(mapStateToProps, {setUserProfileAction, usersProfileAuthThunkCreator,getStatusThunkCreator,updateStatusThunkCreator}),
    WithAuthRedirect,
    withRouter
)(ProfileContainer)