import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, logout, setAuthUsersDataAC} from "../redux/AuthReducer";
import header_classes from "./Header.module.css"
import {usersAPI} from "../../api/Api";

class HeaderContainer extends React.Component<any, any> {
    // componentDidMount() {
    //     this.props.getAuthUserData()
    // }

    render() {
        return (
            <div className={header_classes.header}>
                <Header {...this.props} />
            </div>
        )

    }
}

let mapStateToProps = (state: any) => ({
    isAuth: state.userAuthPage.isAuth,
    login: state.userAuthPage.login
});
// export default connect(mapStateToProps, {setAuthUsersDataAC,getAuthUserData,logout})(HeaderContainer);
export default connect(mapStateToProps, {logout})(HeaderContainer);
