import { ApiService } from "./ApiService";
import { IUser } from "../../resources/types/user.type";
import { GET_USER_PROJECT_LIST_URL } from "../../resources/constants/urls";

export class ProjectService extends ApiService {
  constructor() {
    super();
  }

  getCurrentUser(): Promise<IUser> {
    return this.axiosInstance.get(GET_USER_PROJECT_LIST_URL);
  }
}
