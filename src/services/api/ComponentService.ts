import { ApiService } from "./ApiService";
import { IProject } from "../../resources/types/project.type";
import { COMPONENT_URL, COMPONENT_WITH_DETAILS_URL } from "../../resources/constants/urls";
import { IComponent, IComponentWithDetails, ICreateComponentDto } from "../../resources/types/component.type";

export class ComponentService extends ApiService {
  constructor() {
    super();
  }

  createProject(createComponentDto: ICreateComponentDto): Promise<IProject> {
    return this.axiosInstance.post(COMPONENT_URL, createComponentDto);
  }

  getProject(id: string): Promise<IComponent> {
    return this.axiosInstance.get(`${COMPONENT_URL}/${id}`);
  }

  getProjectWithDetails(id: string): Promise<IComponentWithDetails> {
    return this.axiosInstance.get(`${COMPONENT_WITH_DETAILS_URL}/${id}`);
  }
}
