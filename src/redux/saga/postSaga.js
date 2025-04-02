import {put,call, takeLatest,delay } from 'redux-saga/effects';
import { types } from '../action/type';
import { requestPost,successPost,failurePost, requestLogin, successLogin, failureLogin, requestUserRegister, successUserRegister, failureUserRegister } from '../reducers/postRerducer.js';
import { getPost, PostUserRegister } from '../services/api.js';

// Worker Saga: Fetch Student Enquiry

function* fetchPost() {
    try {
      yield put(requestPost());
      const post = yield call(getPost);
      console.log("post", post);
      yield put(successPost(post));
    } catch (error) {
      yield put(failurePost(error));
    }
  }

  // ✅ Fake Login Worker Saga
function* loginUser(action) {
    try {
      yield put((requestLogin));
      yield delay(1000); // Simulate network delay
  
      const { email, password } = action.payload;
  
      // ✅ Hardcoded Demo User
      const demoUser = {
        email: "demo@example.com",
        password: "password123",
        id: 1,
        name: "Demo User",
      };

      console.log("demoUser", demoUser);
  
      // ✅ Validate Credentials
      if (email === demoUser.email && password === demoUser.password) {
        yield put(successLogin(demoUser));
        console.log(" success full login demoUser", demoUser);
  
      } else {
        yield put(failureLogin({ data: "Invalid credentials", status: 401 }));
      }
    } catch (error) {
      yield put(failureLogin({ data: "Something went wrong", status: 500 }));
    }
  }

  function* userRegister(action) {
    try {
      yield put(requestUserRegister());
      const post = yield call(PostUserRegister, action.payload);
      console.log("user Register", post);
      yield put(successUserRegister(post));
    } catch (error) {
      yield put(failureUserRegister(error));
    }
  }













  export function* watcheReduxApplication() {
    yield takeLatest(types.Post, fetchPost);
    yield takeLatest(types.Login, loginUser);
    yield takeLatest(types.UserRegister, userRegister);
  }