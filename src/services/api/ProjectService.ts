import { ApiService } from "./ApiService";
import { IComponent } from "../../resources/types/component.type";
import { ICreateProjectDto, IEditProjectDto, IProject } from "../../resources/types/project.type";
import { COMPONENT_LIST_URL, GET_USER_PROJECT_LIST_URL, PROJECT_URL } from "../../resources/constants/urls";

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

  getProjectComponentList(id: string): Promise<IComponent[]> {
    return this.axiosInstance.get(`${PROJECT_URL}/${id}/${COMPONENT_LIST_URL}`);
  }

  createProject(createProjectDto: ICreateProjectDto): Promise<IProject> {
    return this.axiosInstance.post(PROJECT_URL, createProjectDto);
  }

  editProject(editProjectDto: IEditProjectDto): Promise<void> {
    const { id, ...editedData } = editProjectDto;
    return this.axiosInstance.patch(`${PROJECT_URL}/${id}`, editedData);
  }
}
