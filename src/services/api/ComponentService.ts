import { ApiService } from "./ApiService";
import { IProject } from "../../resources/types/project.type";
import { COMPONENT_URL } from "../../resources/constants/urls";
import { ICreateComponentDto } from "../../resources/types/component.type";

export class ComponentService extends ApiService {
  constructor() {
    super();
  }

  createProject(createComponentDto: ICreateComponentDto): Promise<IProject> {
    return this.axiosInstance.post(COMPONENT_URL, createComponentDto);
  }
}
