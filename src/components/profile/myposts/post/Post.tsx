import React from "react";
import profile_classes from "./Post.module.css"
import "../../../../App.css"
import {PostsArrType} from "../../../redux/Store";

function Post(props: PostsArrType) {
    return (
        <div>
            <div className={profile_classes.item}>
                <h3>My Posts</h3>
                <div>
                    <img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-X12sh_TZCsr6QqQt-e4BPN7FnWMuCvwIqw&usqp=CAU" alt=""/>
                    <ul>
                        <li> {props.message}</li>
                        <li> Likes :  {props.likesCount}</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Post;
