import { ApiService } from "./ApiService";
import { COMPONENT_URL, COMPONENT_WITH_DETAILS_URL } from "../../resources/constants/urls";

import {
  IComponent,
  IEditComponentDto,
  ICreateComponentDto,
  IComponentWithDetails
} from "../../resources/types/component.type";

export class ComponentService extends ApiService {
  constructor() {
    super();
  }

  createComponent(createComponentDto: ICreateComponentDto): Promise<IComponent> {
    return this.axiosInstance.post(COMPONENT_URL, createComponentDto);
  }

  getComponent(id: string): Promise<IComponent> {
    return this.axiosInstance.get(`${COMPONENT_URL}/${id}`);
  }

  getComponentWithDetails(id: string): Promise<IComponentWithDetails> {
    return this.axiosInstance.get(`${COMPONENT_WITH_DETAILS_URL}/${id}`);
  }

  editComponent(editComponentDto: IEditComponentDto): Promise<void> {
    const { id, ...editedData } = editComponentDto;
    return this.axiosInstance.patch(`${COMPONENT_URL}/${id}`, editedData);
  }
}
