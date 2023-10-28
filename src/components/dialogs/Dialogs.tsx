import React from "react";
import profile_classes from "./Dialogs.module.css"
import DialogItem from "./dialogitem/DialogItem"
import {DialogsComponentProps} from "./dialogitem/DialogsContainer";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../utils/validators/Validators";
import {Textarea} from "../common/forms_controls/FormsControls";


function Dialogs(props: DialogsComponentProps) {
    const dialogs_obj = props.messagesPage.dialogs_data.map(item => <div key={item.name}><DialogItem image={item.image} name={item.name} id={item.id}/>
    </div>)
    const message_obj = props.messagesPage.data_messages.map(item => <div key={item.message}> {item.message} </div>)

    const addMessage = (value : any) => {
        console.log(value.onChangeMessage)
        let newMessageValue = value.onChangeMessage
        props.addMessage(newMessageValue)

    }

    return (
        <div className={profile_classes.dialogs}>

            <div className={profile_classes.dialogs_items}>
                {dialogs_obj}
            </div>

            <div className={profile_classes.messages}>
                {message_obj}
            </div>
            <DialogsReduxForm onSubmit={addMessage}/>
        </div>
    )
}
const maxLength10  = maxLengthCreator(10)

const DialogsForm = (props : any) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <Field
                    name="onChangeMessage"
                    component={Textarea}
                    placeholder="submit your message"
                    validate={[requiredField , maxLength10]}
                />
                <button  >Add New Message</button>
            </form>
        )
}
const DialogsReduxForm = reduxForm({form: 'dialogsReduxForm'})(DialogsForm)


export default Dialogs