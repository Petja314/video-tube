import React from "react";
import profile_classes from "./myposts/post/Post.module.css"
import ProfileInfo from "./profileinfo/ProfileInfo";
import MyPostsContainer from "./myposts/post/MyPostsContainer";

type ProfilePropsTypeComponent = {
    status :  string
    updateStatusThunkCreator :  (status: any) =>  void
    profile : any
}


function Profile(props: ProfilePropsTypeComponent) {
    return (
        <div>
            <div className={profile_classes.profile_slider}>
                <ProfileInfo
                    updateStatusThunkCreator={props.updateStatusThunkCreator}
                    status={props.status}
                    profile={props.profile}
                    image="https://www.kapwing.com/resources/content/images/size/w1200/2021/11/Kapwing-Thumbnails.png"/>
            </div>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;

