import React from "react"
import {useForm} from "react-hook-form"


const OnboardingForm = () => {
    const {register, handleSubmit, errors} = useForm()
    const onSubmit = data => console.log("data", data)
    console.log("errors", errors)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                placeholder="Username"
                name="username"
                ref={register({required: true, maxLength: 80})}
            />
            <input
                type="text"
                placeholder="Password"
                name="password"
                ref={register({required: true, min: 4, maxLength: 100})}
            />
            <input
                type="text"
                placeholder="Confirm Password"
                name="confirm_password"
                ref={register({
                    required: true,
                    min: {
                        value: 4,
                        message: 'Password must be at least four characters.'
                    } ,
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Passwords do not match.",
                    },
                })}
            />
            {errors["Confirm Password"] && errors["Confirm Password"].message}

            <input type="submit" />
        </form>
    )
}

export default OnboardingForm
