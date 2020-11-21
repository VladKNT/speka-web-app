import { ApiService } from "./ApiService";
import { IUser } from "../../resources/types/user.type";
import { ORGANIZATION_URL, STAFF_LIST_URL } from "../../resources/constants/urls";

export class OrganizationService extends ApiService {
  constructor() {
    super();
  }

  getStaff(id: string): Promise<IUser> {
    return this.axiosInstance.get(`${ORGANIZATION_URL}/${id}/${STAFF_LIST_URL}`);
  }
}
