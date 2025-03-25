import { getBasicSlice } from "../utils/getBasicSlices";
const Post = getBasicSlice("Post");

export const {
    fetchRequest: requestPost,
    fetchSuccess: successPost,
    fetchFailure: failurePost,
}=Post.actions


export const PostReducer = Post.reducer;