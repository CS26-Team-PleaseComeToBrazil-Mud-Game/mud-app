import React, {useReducer} from "react"

export const actn = {
    isLoading: "isLoading",
    updateUser: "updateUser",
}

const initStore = {userToken: null, isLoading: false}

const reducer = (state, action) => {
    switch (action.type) {
        case actn.isLoading:
            return {...state, isLoading: action.payload}

        case actn.updateUser:
            return {...state, ...action.payload}

        default:
            return state
    }
}

export const AppContext = React.createContext(initStore)

function Context(props) {
    const [state, dispatch] = useReducer(reducer, initStore)
    return (
        <AppContext.Provider value={{state, dispatch}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default Context
