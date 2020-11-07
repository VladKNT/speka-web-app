import { ApiService } from "./ApiService";
import { IUser } from "../../resources/types/user.type";
import { GET_CURRENT_USER_URL } from "../../resources/constants/urls";

export class UserService extends ApiService {
  constructor() {
    super();
  }

  getCurrentUser(): Promise<IUser> {
    return this.axiosInstance.get(GET_CURRENT_USER_URL);
  }
}
