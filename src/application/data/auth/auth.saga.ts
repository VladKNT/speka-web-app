import { AnyAction } from "redux";
import { signInRoutine } from "./auth.routine";

export function* signIn(action: ReturnType<typeof signInRoutine.trigger>): Generator<AnyAction> {
  try {
    signInRoutine.request();

    const { email, password } = action.payload;
    console.info({ email, password });

    signInRoutine.success();
  } catch (error) {
    signInRoutine.failure(error.message);
  } finally {
    signInRoutine.fulfill();
  }
}
