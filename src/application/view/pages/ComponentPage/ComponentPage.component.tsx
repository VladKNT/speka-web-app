import React, { Component, ReactNode } from "react";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { IRootReducer } from "../../../data/root.reducer";
import { IUser } from "../../../../resources/types/user.type";
import { MembersModal } from "../../components/Modals/MembersModal";
import { AssignMembersModal}  from "../../components/Modals/AssignMemberModal";
import { IProjectIDRouteParam } from "../../../../resources/types/common.type";
import { ComponentInfo } from "../../components/ComponentComponents/ComponentInfo";
import { getProjectTeamMembersRoutine } from "../../../data/project/project.routine";
import { IGetTeamMembersTriggerPayload } from "../../../../resources/types/project.type";
import { ComponentDetailsInfo } from "../../components/ComponentComponents/ComponentDetailsInfo";
import { ASSIGN_MEMBER_TO_COMPONENT, COMPONENT_ASSIGNEES } from "../../../../resources/constants/strings";
import { initialEditComponent, initialEditComponentDetails } from "../../../../resources/constants/component";

import {
  getComponentRoutine,
  editComponentRoutine,
  clearComponentWithDetails,
  getComponentAssigneesRoutine,
  assignComponentMemberRoutine,
  createComponentDetailsRoutine,
  clearComparisonComponentDetails,
  getComponentDetailsByVersionRoutine,
} from "../../../data/component/component.routine";

import {
  IComponent,
  IComponentDetails,
  IEditComponentDto,
  IGetComponentTriggerPayload,
  IGetAssigneesTriggerPayload,
  IEditComponentTriggerPayload,
  IAssignComponentMemberTriggerPayload,
  ICreateComponentDetailsTriggerPayload,
  IGetComponentDetailsByVersionTriggerPayload,
} from "../../../../resources/types/component.type";

import {
  EEditComponentFields,
  IEditComponentFields,
  IEditComponentDetailsFields,
  EEditComponentDetailsFields,
} from "../../../../resources/types/fields/editComponentFields";

import "./ComponentPage.style.scss";

export interface IComponentPageOwnProps {
  loading: number;
  component: IComponent | null;
  teamMembers: IUser[];
  componentAssignees: IUser[];
  componentDetails: IComponentDetails | null;
  comparisonComponentDetails: IComponentDetails | null;

  onClearComponentWithDetails: () => void;
  onClearComparisonComponentDetails: () => void;
  onGetAssignees: (payload: IGetAssigneesTriggerPayload) => void,
  onGetComponent: (payload: IGetComponentTriggerPayload) => void;
  onEditComponent: (payload: IEditComponentTriggerPayload) =>  void;
  onGetTeamMembers: (payload: IGetTeamMembersTriggerPayload) => void,
  onAssignMember: (payload: IAssignComponentMemberTriggerPayload) => void,
  onCreateComponentDetails: (payload: ICreateComponentDetailsTriggerPayload) => void;
  onGetComponentDetailsByVersion: (payload: IGetComponentDetailsByVersionTriggerPayload) => void;
}

export interface IComponentPageInjectedProps extends RouteComponentProps<IProjectIDRouteParam> {}
export interface IComponentPageProps extends IComponentPageOwnProps, IComponentPageInjectedProps {}

interface IState {
  compareVersion: number;
  editComponent: boolean;
  editComponentDetails: boolean;
  showTeamMembersModal: boolean;
  showAssignMembersModal: boolean;
  componentEditing: IEditComponentFields;
  componentDetailsEditing: IEditComponentDetailsFields;
}

class ComponentPage extends Component<IComponentPageProps, IState> {
  constructor(props: IComponentPageProps) {
    super(props);

    this.state = {
      compareVersion: 0,
      editComponent: false,
      editComponentDetails: false,
      showTeamMembersModal: false,
      showAssignMembersModal: false,
      componentEditing: initialEditComponent,
      componentDetailsEditing: initialEditComponentDetails,
    }
  }

  componentDidMount(): void {
    const { match, onGetComponent, onGetAssignees, onGetTeamMembers } = this.props;

    const { id, projectId } = match.params;

    onGetComponent({ id });
    onGetAssignees({ id });
    onGetTeamMembers({ id: projectId });
  }

  componentWillUnmount(): void {
    const { onClearComponentWithDetails } = this.props;
    onClearComponentWithDetails();
  }

  onChangeComponentEditing = (field: EEditComponentFields, value: string): void => {
    this.setState((prevState) => ({
      componentEditing: {
        ...prevState.componentEditing,
        [field]: value,
      }
    }));
  };

  onChangeComponentDetailsEditing = (field: EEditComponentDetailsFields, value: string): void => {
    this.setState((prevState) => ({
      componentDetailsEditing: {
        ...prevState.componentDetailsEditing,
        [field]: value,
      }
    }));
  };

  // ======== Edit component logic ========

  onStartComponentEditing = (): void => {
    const { component } = this.props;

    if (component) {
      this.setState({
        editComponent: true,
        componentEditing: {
          [EEditComponentFields.NAME]: component.name,
          [EEditComponentFields.PHASE]: component.phase,
          [EEditComponentFields.DESCRIPTION]: component.description,
          [EEditComponentFields.SPENT_TIME]: component.spentTime.toString(10),
          [EEditComponentFields.ESTIMATED_TIME]: component.estimatedTime.toString(10),
        }
      });
    }
  }

  onEndComponentEditing = (): void => {
    this.setState({ editComponent: false, componentEditing: initialEditComponent });
  }

  onSaveComponentEditing = (): void => {
    const { componentEditing } = this.state;
    const { match, onEditComponent } = this.props;

    const { id } = match.params;
    const editComponentDto: IEditComponentDto = {
      id,
      ...componentEditing,
      spentTime: componentEditing[EEditComponentFields.SPENT_TIME]
        ? parseInt(componentEditing[EEditComponentFields.SPENT_TIME]!, 10)
        : undefined,

      estimatedTime: componentEditing[EEditComponentFields.ESTIMATED_TIME]
        ? parseInt(componentEditing[EEditComponentFields.ESTIMATED_TIME]!, 10)
        : undefined,
    }

    onEditComponent(editComponentDto);
    this.onEndComponentEditing();
  }

  // ======== Edit component details logic ========

  onStartComponentDetailsEditing = (): void => {
    const { componentDetails } = this.props;

    if (componentDetails) {
      this.setState({
        editComponentDetails: true,
        componentDetailsEditing: {
          [EEditComponentDetailsFields.NOTES]: componentDetails.notes,
          [EEditComponentDetailsFields.FEATURES]: componentDetails.features,
          [EEditComponentDetailsFields.REQUIREMENTS]: componentDetails.requirements,
          [EEditComponentDetailsFields.FUTURE_FEATURES]: componentDetails.futureFeatures,
        }
      });
    }
  }

  onEndComponentDetailsEditing = (): void => {
    this.setState({ editComponentDetails: false, componentDetailsEditing: initialEditComponentDetails });
  }

  onSaveComponentDetailsInfo = (): void => {
    const { componentDetailsEditing } = this.state;
    const { match, onCreateComponentDetails } = this.props;

    const { id } = match.params;

    onCreateComponentDetails({ id, ...componentDetailsEditing });
    this.onEndComponentDetailsEditing();
  }

  onChangeCompareVersion = (version: number): void => {
    const { match, onClearComparisonComponentDetails, onGetComponentDetailsByVersion } = this.props;
    const { id } = match.params;

    this.setState({ compareVersion: version });

    if (version) {
      onGetComponentDetailsByVersion({ id, version });
    } else {
      onClearComparisonComponentDetails();
    }
  }

  getDetailsFields = () => {
    const { componentDetails } = this.props;
    const { editComponentDetails, componentDetailsEditing } = this.state;
    const { notes, features, futureFeatures, requirements } = componentDetails!;

    const {
      notes: notesEditing,
      features: featuresEditing,
      requirements: requirementsEditing,
      futureFeatures: futureFeaturesEditing,
    } = componentDetailsEditing;

    return {
      notes: editComponentDetails ? notesEditing : notes,
      features: editComponentDetails ? featuresEditing : features,
      requirements: editComponentDetails ? requirementsEditing : requirements,
      futureFeatures: editComponentDetails ? futureFeaturesEditing : futureFeatures,
    }
  }

  onToggleTeamMembersModal = (): void => {
    this.setState((prevState) => ({
      showTeamMembersModal: !prevState.showTeamMembersModal,
    }));
  }

  onToggleAssignMembersModal = (): void => {
    this.setState((prevState) => ({
      showAssignMembersModal: !prevState.showAssignMembersModal,
    }));
  }

  onOpenAssignMemberModal = (): void => {
    this.onToggleTeamMembersModal();
    this.onToggleAssignMembersModal();
  }

  onAssignTeamMember = (teamMemberId: string): void => {
    const { match, onAssignMember } = this.props;
    const { id } = match.params;

    onAssignMember({ id, teamMemberId });
    this.onToggleAssignMembersModal();
  }

  render(): ReactNode {
    const { showTeamMembersModal, showAssignMembersModal } = this.state;
    const { component, componentAssignees, teamMembers, componentDetails, comparisonComponentDetails } = this.props;

    const {
      editComponent,
      compareVersion,
      componentEditing,
      editComponentDetails,
    } = this.state;

    if (!component || !componentDetails) {
      return null;
    }

    return (
      <div className="b-component-page">
        <ComponentInfo
          component={component}
          isEditing={editComponent}
          componentEditing={componentEditing}
          onChange={this.onChangeComponentEditing}
          onEndEditing={this.onEndComponentEditing}
          onSaveEditing={this.onSaveComponentEditing}
          onStartEditing={this.onStartComponentEditing}
          onOpenAssigneesModal={this.onToggleTeamMembersModal}
        />

        <ComponentDetailsInfo
          compareVersion={compareVersion}
          isEditing={editComponentDetails}
          currentVersion={componentDetails.version}
          onSaveEditing={this.onSaveComponentDetailsInfo}
          onChange={this.onChangeComponentDetailsEditing}
          onEndEditing={this.onEndComponentDetailsEditing}
          componentDetailsFields={this.getDetailsFields()}
          onChangeCompareVersion={this.onChangeCompareVersion}
          onStartEditing={this.onStartComponentDetailsEditing}
          comparisonComponentDetails={comparisonComponentDetails}
        />

        <MembersModal
          users={componentAssignees}
          open={showTeamMembersModal}
          title={COMPONENT_ASSIGNEES}
          onClose={this.onToggleTeamMembersModal}
          onAddMember={this.onOpenAssignMemberModal}
        />

        <AssignMembersModal
          users={teamMembers}
          open={showAssignMembersModal}
          title={ASSIGN_MEMBER_TO_COMPONENT}
          onAddMember={this.onAssignTeamMember}
          onClose={this.onToggleAssignMembersModal}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { selectedProjectTeamMembers } = state.projectReducer;
  const { loading, component, componentAssignees, componentDetails, comparisonComponentDetails } = state.componentReducer;

  return {
    loading,
    component,
    componentDetails,
    componentAssignees,
    comparisonComponentDetails,
    teamMembers: selectedProjectTeamMembers,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onClearComponentWithDetails: () => dispatch(clearComponentWithDetails.trigger()),
    onClearComparisonComponentDetails: () => dispatch(clearComparisonComponentDetails.trigger()),
    onGetComponent: (payload: IGetComponentTriggerPayload) => dispatch(getComponentRoutine.trigger(payload)),
    onEditComponent: (payload: IEditComponentTriggerPayload) => dispatch(editComponentRoutine.trigger(payload)),
    onGetAssignees: (payload: IGetAssigneesTriggerPayload) => dispatch(getComponentAssigneesRoutine.trigger(payload)),
    onGetTeamMembers: (payload: IGetTeamMembersTriggerPayload) => dispatch(getProjectTeamMembersRoutine.trigger(payload)),
    onAssignMember: (payload: IAssignComponentMemberTriggerPayload) => dispatch(assignComponentMemberRoutine.trigger(payload)),
    onCreateComponentDetails: (payload: ICreateComponentDetailsTriggerPayload) => dispatch(createComponentDetailsRoutine.trigger(payload)),
    onGetComponentDetailsByVersion: (payload: IGetComponentDetailsByVersionTriggerPayload) => dispatch(getComponentDetailsByVersionRoutine.trigger(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentPage);
