import { types } from "./type";

export const getPost = () => {
  return {type: types.Post,};
};

export const postLogin = (payload) => {
    return {type: types.Login, payload:payload};
  };