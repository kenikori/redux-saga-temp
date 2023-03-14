import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLeading } from "redux-saga/effects";

import { getUserData } from "../../networking/api/userApi";
import { IUserRequest } from "../../types/request/user.request";
import { IUserResponse } from "../../types/response/user.response";
import { toastActions } from "../toast/toast.reducer";
import { userActions } from "./user.reducer";

export function* getUserDataRequest(action: PayloadAction<IUserRequest>) {
  try {
    const response: IUserResponse = yield call(
      getUserData,
      action.payload.userId
    );

    yield put(userActions.getUserDataSuccess(response));
    yield put(
      toastActions.showToast({
        title: "Success",
        description: "Successful query.",
        status: "success",
      })
    );
  } catch (error) {
    const errorMessage =
      (error as Error).message ?? "Something went wrong. Please try again.";

    yield put(userActions.getUserDataFailure({ errorMessage }));
    yield put(
      toastActions.showToast({
        title: "Error",
        description: errorMessage,
        status: "error",
      })
    );
  }
}

function* watchPost() {
  yield takeLeading(userActions.getUserDataRequest.type, getUserDataRequest);
}

export function* userSagas() {
  yield all([call(watchPost)]);
}
