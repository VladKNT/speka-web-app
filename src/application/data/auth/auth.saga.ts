// @ts-ignore
import { cookies } from "brownies";
import { put } from "redux-saga/effects";

import { signInRoutine } from "./auth.routine";
import { AuthService } from "../../../services/api/AuthService";

const AuthApi = new AuthService();

export function* signIn(action: ReturnType<typeof signInRoutine.trigger>) {
  try {
    yield put(signInRoutine.request());

    //TODO: Add library for fingerprint det
    const fingerprint = "fingerprint";
    const { email, password } = action.payload;
    const { accessToken, refreshToken } = yield AuthApi.signIn({ email, password, fingerprint });

    cookies.accessToken = accessToken;
    cookies.refreshToken = refreshToken;

    yield put(signInRoutine.success());
  } catch (error) {
    yield put(signInRoutine.failure(error.message));
  } finally {
    yield put(signInRoutine.fulfill());
  }
}
