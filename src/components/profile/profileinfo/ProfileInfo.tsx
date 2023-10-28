import React from "react";
import Preloader from "../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus"

type ProfileInfoPropsType = {
    image: string
    profile: any
    status :  string
    updateStatusThunkCreator :  (status: any) => void

}
const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <img style={{"width": "20%"}} src={props.profile.photos.small} alt=""/>
            <ProfileStatus
                status={props.status}
                updateStatusThunkCreator={props.updateStatusThunkCreator}
            />
            <ul style={{"listStyle" : "none"}} >
                <li> {`Full name :  ${props.profile.fullName}`} </li>
                <li> {`Am I looking for a job? :  ${props.profile.lookingForAJob}`} </li>
                <li> {`Apologies that was a joke:  ${props.profile.lookingForAJobDescription}`} </li>
                <li> {` About me :  ${props.profile.aboutMe} My contacts :   ${props.profile.contacts.vk} `}</li>
            </ul>
        </div>
    )
}

export default ProfileInfo;
