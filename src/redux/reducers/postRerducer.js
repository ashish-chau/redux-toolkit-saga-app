import { getBasicSlice } from "../utils/getBasicSlices";
const Post = getBasicSlice("Post");
const Login = getBasicSlice("Login");

export const {
    fetchRequest: requestPost,
    fetchSuccess: successPost,
    fetchFailure: failurePost,
}=Post.actions

export const {
    fetchRequest: requestLogin,
    fetchSuccess: successLogin,
    fetchFailure: failureLogin,
}=Login.actions


export const PostReducer = Post.reducer;
export const LoginReducer = Login.reducer;