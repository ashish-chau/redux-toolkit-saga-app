import { combineReducers } from "@reduxjs/toolkit";

import { PostReducer } from "./postRerducer";
import { cartReducer } from "../utils/getBasicSlices";

export const rootReducer = combineReducers({
    Post: PostReducer,
    cart: cartReducer
    });