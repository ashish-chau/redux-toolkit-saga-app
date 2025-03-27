import { combineReducers } from "@reduxjs/toolkit";

import { PostReducer,LoginReducer } from "./postRerducer";
import { cartReducer } from "../utils/getBasicSlices";

export const rootReducer = combineReducers({
    Post: PostReducer,
    cart: cartReducer,
    Login: LoginReducer,
    });