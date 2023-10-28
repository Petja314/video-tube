import React, {lazy} from 'react';
import './App.css';
import './index'
import Navbar from "./components/navbar/Navbar";
import {Routes, Route, useParams} from "react-router-dom";
import { store} from "./components/redux/Store";
// import DialogsContainer from "./components/dialogs/dialogitem/DialogsContainer"
import UsersContainer from "./components/users/UsersContainer";
// import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Login from "./components/login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./components/redux/AppReducer"
import Preloader from "./components/common/preloader/Preloader";
import { useLocation, useNavigate} from 'react-router-dom';
import {ReactLazyWrappedHOC} from "./components/hoc/ReaxtLazyWrappedHOC";


//REACT LAZY LOADING + HOC
const ProfileContainer = lazy(() =>  import("./components/profile/ProfileContainer"))
let LazyProfileContainer = ReactLazyWrappedHOC(ProfileContainer)
const DialogsContainer = lazy(() =>  import("./components/dialogs/dialogitem/DialogsContainer"))

export const withRouter = (Component: any) => {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
}

class App extends React.Component<any, any> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        const state = store.getState()
        return (
            <div className="app-wrapper container">
                <HeaderContainer/>
                <Navbar data={state.cat_profile} state={state.sideBar}/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path="/profile/:id?"
                               element={
                                   <LazyProfileContainer/>
                               }
                        />
                        <Route path="/dialogs"
                               element={
                                   <React.Suspense fallback={<>Loading...</>}>
                                       <DialogsContainer/>
                                   </React.Suspense>
                               }
                        />



                        <Route path="/users" element={<UsersContainer/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}
let mapStateToProps = (state: any) => ({
    initialized : state.app.initialized
});

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)


