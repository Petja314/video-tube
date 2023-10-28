// import {v1} from "uuid";
import {ProfileReducer} from "./ProfileReducer";
import DialogsReducer from "./DialogsReducer";
// TYPESCRIPT STATE TYPE'S
// =!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!
export type StoreType = {
    _state : MyMainState,
    // updateNewPostText : (newText: string) => void,
    // updatedMessage : (newMessageValue : string) => void
    // addPost : () => void
    // addMessage : () => void
    _rerenderEntireTree : (store: MyMainState) => void
    subscribe: (observer: (store: any) => void) => void;
    getState : () =>   MyMainState
    dispatch : (action : any ) => void
}
export type MyMainState = {
            profilePage:  PostsProfilePageType
            messagesPage: MessagesPageTypeArrays
            cat_profile: NavType
            sideBar: SideBarType
}
export type PostsProfilePageType = {
    newPostText: string,
    posts: PostsArrType[],
    // status? : string
}
export type PostsArrType ={
    message: string, id: string, likesCount: number
}
export type MessagesPageTypeArrays = {
    newMessage_value : string
    dialogs_data: MessagesPageType[],
    data_messages: DataMessagesArrType[],
    newMessageBody : string
    newData_messages : newDataMessageType[]
}
export type MessagesPageType = {
    image: string, name: string, id: string
}

export type newDataMessageType={
    message:string,
    answer:string
}
export  type DataMessagesArrType = {
    message: string,
    answer: string
}
export type NavType = {
    nav : NavArray[]
}
export type NavArray = {
    link: string, text: string
}
export type SideBarType = {
    friends : SideBarFriendsArrType[]
}
export type SideBarFriendsArrType = {
    image: string, name: string, id: string
}
// =!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!=!
export let store : StoreType  = {
    _rerenderEntireTree(store: MyMainState) {
        console.log('state is changed')
    },
    _state: {
        profilePage: {
            newPostText: 'it-kamasutra.com',
            posts: [
                {"message": "It is my first post1", "id": "1", "likesCount": 15},
                {"message": "It is my second post2", "id": "2", "likesCount": 153},
            ]
        },
        messagesPage: {
            dialogs_data: [
                {"image": "https://img.freepik.com/free-icon/user_318-159711.jpg", "name": "Dimon", "id": "1"},
                {"image": "https://img.freepik.com/free-icon/user_318-159711.jpg", "name": "Vasya", "id": "2"},
                {"image": "https://img.freepik.com/free-icon/user_318-159711.jpg", "name": "Fara", "id": "3"},
                {"image": "https://img.freepik.com/free-icon/user_318-159711.jpg", "name": "Mara", "id": "4"},
                {"image": "https://img.freepik.com/free-icon/user_318-159711.jpg", "name": "Viktor", "id": "5"},
                {"image": "https://img.freepik.com/free-icon/user_318-159711.jpg", "name": "Valeriya", "id": "6"}
            ],
            newMessage_value: '',
            data_messages: [
                {"message": "hi", "answer": "my name"},
                {"message": "hello", "answer": "my surname"},
                {"message": "hey", "answer": "my azziz"},
            ],
            newMessageBody: '',
            newData_messages: [
                {"message" : "one" , "answer" : "one"}
            ]
        },
        cat_profile: {
            nav: [
                {"link": "/profile", "text": "Profile"},
                {"link": "/dialogs", "text": "Messages"},
                {"link": "/news", "text": "News"},
                {"link": "/music", "text": "Music"},
                {"link": "/settings", "text": "Settings"},
                {"link" : "/users" , "text" : "Users"}
            ]
        },
        sideBar: {
            friends: [
                {"image": "https://img.freepik.com/free-icon/user_318-159711.jpg", "name": "Dimon", "id": "1"},
                {"image": "https://img.freepik.com/free-icon/user_318-159711.jpg", "name": "Vasya", "id": "2"},
                {"image": "https://img.freepik.com/free-icon/user_318-159711.jpg", "name": "Fara", "id": "3"},
            ]
        }
    },
    dispatch(action: any) {
        ProfileReducer(this._state.profilePage, action);
        DialogsReducer(this._state.messagesPage,action)
        this._rerenderEntireTree(this._state)
    },
    getState() {
        return this._state
    },
    subscribe(observer: (store: MyMainState) => void) {
        this._rerenderEntireTree = observer
    }
}
export default store

