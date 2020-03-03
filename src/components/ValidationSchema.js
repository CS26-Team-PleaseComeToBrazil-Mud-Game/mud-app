import React from "react"
import * as yup from "yup"
const reqMsg = "This field is required"

const LoginSchema = yup.object().shape({
    username: yup.string().required(reqMsg),
    password: yup.string().required(reqMsg),
})

const RegisterSchema = yup.object().shape({
    username: yup
        .string()
        .required(reqMsg)
        .min(4, "Name must be at least four characters")
        .max(30, "Name must be less than 30 characters"),
    password: yup
        .string()
        .required(reqMsg)
        .min(8, "Password must be at least eight characters"),
    confirm_password: yup
        .string()
        .required(reqMsg)
        .oneOf([yup.ref("password"), null], "Passwords Do Not Match"),
})

export {RegisterSchema, LoginSchema}
