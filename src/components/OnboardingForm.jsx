import React, {useContext} from "react"
import {useForm, ErrorMessage} from "react-hook-form"
import {useHistory} from "react-router-dom"
import {RegisterSchema, LoginSchema} from "./ValidationSchema"
import {axiosAuth} from "../utils/axiosAuth"
import axios from "axios"
import {AppContext, actn} from "Context"
//Mui
import CircularProgress from "@material-ui/core/CircularProgress"
import Input from "@material-ui/core/Input"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        maxWidth: "500px",
        padding: theme.spacing(2),
        margin: "0 auto",
    },
    error: {
        marginTop: theme.spacing(2),
        color: theme.palette.secondary.dark,
        fontWeight: 600,
    },
}))

const OnboardingForm = props => {
    const classes = useStyles()
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

       axios
            .post(`${isLogin ? "login" : "registration"}/`, {...reqBody})
            .then(res => {
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
        <Paper className={classes.paper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" align="center" spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            {isLogin ? "Login" : "Register"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            type="text"
                            fullWidth
                            placeholder="Username"
                            name="username"
                            inputRef={register}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="username"
                            as="div"
                            className={classes.error}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Input
                            type={isLogin ? "password" : "text"}
                            placeholder="Password"
                            name="password"
                            inputRef={register}
                            fullWidth
                        />
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            as="div"
                            className={classes.error}
                        />
                    </Grid>
                    {!isLogin && (
                        <Grid item xs={12}>
                            <Input
                                type="text"
                                placeholder="Confirm Password"
                                name="confirm_password"
                                inputRef={register}
                                fullWidth
                            />
                            <ErrorMessage
                                errors={errors}
                                className={classes.error}
                                name="confirm_password"
                                as="div"
                            />
                        </Grid>
                    )}
                    <Grid item sx={6}>
                        {state.isLoading ? (
                            <Button variant="contained" disabled={true}>
                                <CircularProgress />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit(onSubmit)}
                                variant="contained"
                            >
                                Submit
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default OnboardingForm
