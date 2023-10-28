import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {ProfileReducer} from "./ProfileReducer";
import {DialogsReducer} from "./DialogsReducer";
import {UsersReducer} from "./UsersReducer";
import {MusicReducer} from "./MusicReducer";
import {AuthReducer} from "./AuthReducer";
import thunkMiddleware from 'redux-thunk';
import {reducer, reducer as formReducer} from 'redux-form';
import {AppReducer} from "./AppReducer";

export type RootState = ReturnType<typeof rootReducers>

let rootReducers = combineReducers({
    profilePage: ProfileReducer,
    messagesPage: DialogsReducer,
    usersPage: UsersReducer,
    musicPage: MusicReducer,
    userAuthPage : AuthReducer,
    app : AppReducer,
    form : formReducer
});


//@ts-ignore
// That is for REDUX DEV TOOL CHROME EXTENSION
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers( applyMiddleware(thunkMiddleware)))

// --------------------------------------------------------------------------------------------------------

// That is just basic creation of our store
// let store = createStore(rootReducers,applyMiddleware(thunkMiddleware));
// @ts-ignore
// window.store = store

export default store;