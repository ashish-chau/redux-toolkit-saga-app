import {put,call, takeLatest,} from 'redux-saga/effects';
import { types } from '../action/type';
import { requestPost,successPost,failurePost } from '../reducers/postRerducer.js';
import { getPost } from '../services/api.js';

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

  export function* watcheReduxApplication() {
    yield takeLatest(types.Post, fetchPost);
  }