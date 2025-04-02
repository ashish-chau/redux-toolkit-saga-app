import { types } from "./type";

export const getPost = () => {
  return {type: types.Post,};
};

export const postLogin = (payload) => {
    return {type: types.Login, payload:payload};
  };

export const userRegister = (payload) => {
    return {type: types.UserRegister, payload:payload};
  }