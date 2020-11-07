import { ApiService } from "./ApiService";
import { SIGN_IN_URL } from "../../resources/constants/urls";
import { ISignInDto, ITokenPair } from "../../resources/types/auth.type";

export class AuthService extends ApiService {
  constructor() {
    super();
  }

  signIn(signInDto: ISignInDto): Promise<ITokenPair> {
    return this.axiosInstance.post(SIGN_IN_URL, signInDto);
  }
}
