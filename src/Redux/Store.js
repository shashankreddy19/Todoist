import {configureStore} from "@reduxjs/toolkit"
import Reducer from "./Reducer"

const store = configureStore({
    reducer : Reducer, preloadedState: []
})

export default store