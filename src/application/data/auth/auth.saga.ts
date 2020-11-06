import { AnyAction } from "redux";
import { put } from "redux-saga/effects";

import { signInRoutine } from "./auth.routine";

export function* signIn(action: ReturnType<typeof signInRoutine.trigger>): Generator<AnyAction> {
  try {
    yield put(signInRoutine.request());

    const { email, password } = action.payload;
    console.info({ email, password });

    yield put(signInRoutine.success());
  } catch (error) {
    yield put(signInRoutine.failure(error.message));
  } finally {
    yield put(signInRoutine.fulfill());
  }
}
