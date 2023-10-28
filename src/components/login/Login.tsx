import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/forms_controls/FormsControls";
import { requiredField} from "../utils/validators/Validators";
import {connect} from "react-redux";
import { login} from "../redux/AuthReducer";
import {Navigate} from "react-router-dom";

const LoginForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    validate={[requiredField]}
                    placeholder={"Email"}
                    name="email"
                    component={Input}
                    type="login"/>
            </div>
            <div>
                <Field
                    validate={[requiredField]}
                    placeholder={"Password"}
                    name="password"
                    component={Input}
                    type="password"/>
            </div>

            <div>
                {props.isCaptchaRequired && (
                    <div>
                        <img  src={props.captchaUrl} alt="CAPTCHA" />
                        <Field
                            validate={[requiredField]}
                            placeholder={"CAPTCHA"}
                            name="captcha"
                            component={Input}
                        />
                    </div>
                )}
            </div>

            <div>
                <Field
                    placeholder={"rememberMe"}
                    name="rememberMe"
                    component={Input}
                    type="checkbox"/>remember me

            </div>
            <div>
                <button type="submit">Login</button>
            </div>
            <div  style={{color: "red"}} >
                {props.error}
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props: any) => {
    const onSubmit = (formData: any) => {
        props.login(formData.email , formData.password, formData.rememberMe)
        // console.log(formData);
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"} />
    }
    if (props.isCaptchaRequired) {
        props.fetchCaptcha()
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}
            />
        </div>
    );
}
let mapStateToProps = (state: any) => ({
    isAuth: state.userAuthPage.isAuth,
})

export default connect (mapStateToProps,{login})(Login);

