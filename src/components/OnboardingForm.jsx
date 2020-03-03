import React, {useContext} from "react"
import {useForm, ErrorMessage} from "react-hook-form"
import {useHistory} from "react-router-dom"
import {RegisterSchema, LoginSchema} from "./ValidationSchema"
import {axiosAuth} from "../utils/axiosAuth"
import axios from "axios"
import {AppContext, actn} from "Context"

const OnboardingForm = props => {
    const winHistory = useHistory()
    const {state, dispatch} = useContext(AppContext)

    const isLogin = props.match.url.includes("login")

    const {register, handleSubmit, errors, setError} = useForm({
        validationSchema: isLogin ? LoginSchema : RegisterSchema,
    })

    const onSubmit = data => {
        dispatch({type: actn.isLoading, payload: true})
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

        const url =
            process.env.NODE_ENV === "production"
                ? "https://ant-mud.herokuapp.com/api/"
                : "http://localhost:8000/api/"

        axios
            .post(url + `${isLogin ? "login" : "registration"}/`, {...reqBody})
            .then(res => {
                console.log("from login", res)
                data = res.data
                // update store
                dispatch({
                    type: actn.updateUser,
                    payload: {userToken: data.key, isLoading: false},
                })
                // set auth headers
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Token ${data.key}`
                // save token to local storage
                localStorage.setItem("ant_game_token", data.key)
                winHistory.push("/game")
            })
            .catch(response => {
                dispatch({type: actn.isLoading, payload: false})
                console.log("ERROR from Onboarding", response.response)
                const {data} = response.response
                const reqErrs = []
                if (isLogin) {
                    if (data["non_field_errors"]) {
                        data["non_field_errors"].forEach(errmsg => {
                            reqErrs.push({
                                name: "password",
                                type: "bad",
                                message: errmsg,
                            })
                        })
                    }
                    setError(reqErrs)
                }
                // check for data.username
                else {
                    if (data.username) {
                        data.username.forEach(errmsg => {
                            reqErrs.push({
                                name: "username",
                                type: "bad",
                                message: errmsg,
                            })
                        })
                    }
                    // check for data.password
                    if (data.password) {
                        data.password.forEach(errmsg => {
                            reqErrs.push({
                                name: "password",
                                type: "bad",
                                message: errmsg,
                            })
                        })
                    }

                    setError(reqErrs)
                }
            })
    }

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
