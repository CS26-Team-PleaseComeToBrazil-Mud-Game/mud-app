import React from "react"
import {useForm, ErrorMessage} from "react-hook-form"
import {useHistory} from "react-router-dom"
import {RegisterSchema, LoginSchema} from "./ValidationSchema"
import {axiosAuth} from "../utils/axiosAuth"
import axios from "axios"

const OnboardingForm = props => {
    const winHistory = useHistory()

    const isLogin = props.match.url.includes("login")

    const {register, handleSubmit, errors, setError} = useForm({
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

        console.log(reqBody, "REQBODY")

        axios
            .post(
                `http://127.0.0.1:8000/api/${
                    isLogin ? "login" : "registration"
                }/`,
                {...reqBody},
            )
            .then(res => {
                console.log("from login", res)
                data = res.data
                // axiosAuth.defaults.headers.common['Authorization'] = `Token ${data.key}`
                // save token to local storage
                localStorage.setItem("ant_game_token", data.key)
                winHistory.push("/game")
            })
            .catch(response => {
                console.log("ERROR from Onboarding", response.response)
                const {data} = response.response

                if (isLogin) {
                    if (data["non_field_errors"]) {
                        data["non_field_errors"].forEach(errmsg => {
                            setError("password", "bad", errmsg)
                        })
                    }
                }
                // check for data.username
                else {
                    if (data.username) {
                        data.username.forEach(errmsg => {
                            setError("username", "bad", errmsg)
                        })
                    }
                    // check for data.password
                    else if (data.password) {
                        data.password.forEach(errmsg => {
                            setError("password", "bad", errmsg)
                        })
                    }
                }
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
            <ErrorMessage errors={errors} name="username" as="div" />

            <input
                type={isLogin ? "password" : "text"}
                placeholder="Password"
                name="password"
                ref={register}
            />
            <ErrorMessage errors={errors} name="password" as="div" />

            {!isLogin && (
                <>
                    <input
                        type="text"
                        placeholder="Confirm Password"
                        name="confirm_password"
                        ref={register}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="confirm_password"
                        as="div"
                    />
                </>
            )}
            <input type="submit" />
        </form>
    )
}

export default OnboardingForm
