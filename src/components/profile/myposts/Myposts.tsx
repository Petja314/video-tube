import Post from "./post/Post";
import {PostsArrType} from "../../redux/Store";
import {MapDispatchPropsType, MapStatePropsType} from "./post/MyPostsContainer";
import React, {memo} from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../utils/validators/Validators";
import {Textarea} from "../../common/forms_controls/FormsControls";

export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType

function  MyPosts ( props: MyPostsPropsType)  {
    const posts_data = props.profilePage.posts.map((item,index) => (
        <Post key={item.id} message={item.message} id={item.id} likesCount={item.likesCount} />
    ));
    const addPost = (value : any) => {
        let newPostValue = value.onPostChange
        props.addPost(newPostValue);
    };

    return (
        <div>
            <MyPostsReduxForm onSubmit={addPost} />
            <div>{posts_data}</div>
        </div>
    );
}
const maxLength10  = maxLengthCreator(10)
// const required = (value : any) => (value || typeof value === 'number' ? undefined : 'Required')
// const maxLength = (max : any) => (value : any) =>
//     value && value.length > max ? `Must be ${max} characters or less` : undefined
// const maxLength15 = maxLength(15)

const MyPostsForm = (props : any) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <Field
                name="onPostChange"
                component={Textarea}
                placeholder="Type new post text"
                validate={[requiredField , maxLength10]}
            />
            <button> Add Post </button>
        </form>
    )
}
const MyPostsReduxForm = reduxForm({form : "myPostsReduxForm"})(MyPostsForm)
export default MyPosts;
