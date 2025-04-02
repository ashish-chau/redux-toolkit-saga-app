import { getBasicSlice } from "../utils/getBasicSlices";
const Post = getBasicSlice("Post");
const Login = getBasicSlice("Login");
const UserRegister = getBasicSlice("UserRegister");

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

export const {
    fetchRequest: requestUserRegister,
    fetchSuccess: successUserRegister,
    fetchFailure: failureUserRegister,
}=UserRegister.actions


export const PostReducer = Post.reducer;
export const LoginReducer = Login.reducer;
export const UserRegisterReducer = UserRegister.reducer;