import { ApiService } from "./ApiService";
import { IUser } from "../../resources/types/user.type";

import {
  COMPONENT_URL,
  TEAM_MEMBER_LIST_URL,
  COMPONENT_DETAILS_URL,
  TEAM_MEMBER_ASSIGN_URL,
  COMPONENT_WITH_DETAILS_URL,
} from "../../resources/constants/urls";

import {
  IComponent,
  IComponentDetails,
  IEditComponentDto,
  ICreateComponentDto,
  IComponentWithDetails,
  ICreateComponentDetailsDto,
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

  createComponentDetails(id: string, createComponentDetailsDto: ICreateComponentDetailsDto): Promise<IComponentDetails> {
    return this.axiosInstance.post(`${COMPONENT_URL}/${id}/${COMPONENT_DETAILS_URL}`, createComponentDetailsDto);
  }

  getComponentDetailsByVersion(id: string, version: number): Promise<IComponentDetails> {
    return this.axiosInstance.get(`${COMPONENT_URL}/${id}/${COMPONENT_DETAILS_URL}`, {
      params: { version },
    });
  }

  getAssignees(id: string): Promise<IUser> {
    return this.axiosInstance.get(`${COMPONENT_URL}/${id}/${TEAM_MEMBER_LIST_URL}`);
  }

  assignComponentMember(id: string, teamMemberId: string): Promise<void> {
    return this.axiosInstance.patch(`${COMPONENT_URL}/${id}/${TEAM_MEMBER_ASSIGN_URL}`, { teamMemberId });
  }
}
