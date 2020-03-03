import React from "react"
import {useForm} from "react-hook-form"
import {RegisterSchema, LoginSchema} from "./ValidationSchema"
import {axiosAuth} from "../utils/axiosAuth"
import axios from "axios"

const OnboardingForm = props => {
    const isLogin = props.match.url.includes("login")

    const {register, handleSubmit, errors} = useForm({
        validationSchema: isLogin ? LoginSchema : RegisterSchema,
    })

    const onSubmit = data => {
        console.log("data", data)
        // object to send in body
        let reqBody = {
            username: data.username,
        }

        reqBody = isLogin
            ? {...reqBody, password: data.password}
            : {
                  ...reqBody,
                  password1: data.password,
                  password2: data.confirm_password,
              }
        console.log(reqBody,'REQBODY')
        axios
            .post(`http://127.0.0.1:8000/api/${isLogin ? "login" : "registration"}/`, {...reqBody})
            .then(res => {
                console.log("from login", res)
                data = res.data
                // axiosAuth.defaults.headers.common['Authorization'] = `Token ${data.key}`
                // save token to local storage
                localStorage.setItem("ant_game_token", data.key)
            })
            .catch(response => {
                console.log("ERROR from Onboarding", response.response)
                // if isLogin
                // check for data.invalid
                //else
                // check for data.username
                // errors.username.message = data.username[0]
                // check for data.password
                // errors.password.message = data.password1[0]
            })
    }

    console.log("errors", errors)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                placeholder="Username"
                name="username"
                ref={register}
            />
            <input
                type={isLogin ? "password" : "text"}
                placeholder="Password"
                name="password"
                ref={register}
            />
            {!isLogin && (
                <input
                    type="text"
                    placeholder="Confirm Password"
                    name="confirm_password"
                    ref={register}
                />
            )}
            {!isLogin &&
                errors["Confirm Password"] &&
                errors["Confirm Password"].message}
            <input type="submit" />
        </form>
    )
}

export default OnboardingForm
