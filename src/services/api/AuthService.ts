import { ApiService } from "./ApiService";
import { SIGN_IN_URL, SIGN_UP_URL } from "../../resources/constants/urls";
import { ISignInDto, ISignUpDto, ITokenPair } from "../../resources/types/auth.type";

export class AuthService extends ApiService {
  constructor() {
    super();
  }

  signIn(signInDto: ISignInDto): Promise<ITokenPair> {
    return this.axiosInstance.post(SIGN_IN_URL, signInDto);
  }

  signUp(signInDto: ISignUpDto): Promise<ITokenPair> {
    return this.axiosInstance.post(SIGN_UP_URL, signInDto);
  }
}
