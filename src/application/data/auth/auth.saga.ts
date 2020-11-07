// @ts-ignore
import { cookies } from "brownies";
import { put } from "redux-saga/effects";

import { signInRoutine, signUpRoutine } from "./auth.routine";
import { AuthService } from "../../../services/api/AuthService";

//TODO: Add library for fingerprint detection
const fingerprint = "fingerprint";
const AuthApi = new AuthService();

export function* signIn(action: ReturnType<typeof signInRoutine.trigger>) {
  try {
    yield put(signInRoutine.request());

    const res = yield AuthApi.signIn({ ...action.payload, fingerprint });

    cookies.accessToken = res.accessToken;
    cookies.refreshToken = res.refreshToken;

    yield put(signInRoutine.success());
  } catch (error) {
    yield put(signInRoutine.failure({ error: error.message }));
  } finally {
    yield put(signInRoutine.fulfill());
  }
}

export function* signUp(action: ReturnType<typeof signUpRoutine.trigger>) {
  try {
    yield put(signUpRoutine.request());

    const {
      accessToken,
      refreshToken,
    } = yield AuthApi.signUp({ ...action.payload, fingerprint });

    cookies.accessToken = accessToken;
    cookies.refreshToken = refreshToken;

    yield put(signUpRoutine.success());
  } catch (error) {
    yield put(signInRoutine.failure({ error: error.message }));
  } finally {
    yield put(signUpRoutine.fulfill());
  }
}
