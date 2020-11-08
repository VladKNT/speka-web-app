import { ApiService } from "./ApiService";
import { IEditProjectDto, IProject } from "../../resources/types/project.type";
import { GET_USER_PROJECT_LIST_URL, PROJECT_URL } from "../../resources/constants/urls";

export class ProjectService extends ApiService {
  constructor() {
    super();
  }

  getProjectById(id: string): Promise<IProject> {
    return this.axiosInstance.get(`${PROJECT_URL}/${id}`);
  }

  getUserProjectList(): Promise<IProject[]> {
    return this.axiosInstance.get(GET_USER_PROJECT_LIST_URL);
  }

  editProject(editProjectDto: IEditProjectDto): Promise<void> {
    const { id, ...editedData } = editProjectDto;
    return this.axiosInstance.patch(`${PROJECT_URL}/${id}`, editedData);
  }
}
