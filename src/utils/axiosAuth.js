import axios from "axios"

export const axiosAuth = () => {
    const token = localStorage.getItem("ant_game_token")
    console.log(token, "token")
    return axios.create({
        baseURL:
            process.env.NODE_ENV !== "production"
                ? "http://127.0.0.1:8000/api/"
                : "",
        headers: {
            Authorization: token,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
    })
}
