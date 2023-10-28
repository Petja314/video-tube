import React, {useEffect, useState} from 'react';
import {log} from "util";

type ProfileStatusPropsType = {
    status :  string
    updateStatusThunkCreator :  (status: any) => void

}

const ProfileStatus = (props: ProfileStatusPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)
    const onChangeStatusHandler = (event : any) => {
        let statusCurrentValue = event.currentTarget.value
        // console.log(statusCurrentValue)
        setStatus(statusCurrentValue)
    }

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatusThunkCreator(status)
    }

    useEffect(() => {
        if (props.status !== status) {
            setStatus(props.status)
        }
    },[props.status])

    return (

        <div>
            {!editMode &&
                <div>
                    <span>status : </span>
                    <span  onDoubleClick={activateEditMode}   style={{fontWeight: "bold"}} >{status || "NO STATUS"}</span>
                </div>
            }

            {editMode &&
                <div>
                    <input
                        onChange={onChangeStatusHandler}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status}/>
                </div>
            }
            {/*{status}*/}
        </div>
    );
};

export default ProfileStatus;