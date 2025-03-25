import { combineReducers } from "@reduxjs/toolkit";

import { PostReducer } from "./postRerducer";

export const rootReducer = combineReducers({
    Post: PostReducer,
    });