import React, { Component, ReactNode } from "react";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import GroupIcon from "@material-ui/icons/Group";
import IconButton from "@material-ui/core/IconButton";
import { RouteComponentProps } from "react-router-dom";

import { IRootReducer } from "../../../data/root.reducer";
import { IUser } from "../../../../resources/types/user.type";
import { MembersModal } from "../../components/Modals/MembersModal";
import { IComponent } from "../../../../resources/types/component.type";
import { IIdRouteParam } from "../../../../resources/types/common.type";
import { ComponentTable } from "../../components/UI/Tables/ComponentTable";
import { ProjectInfo } from "../../components/ProjectComponents/ProjectInfo";
import { AssignMembersModal } from "../../components/Modals/AssignMemberModal";
import { getStaffRoutine } from "../../../data/organization/organization.routine";
import { EEditProjectFields } from "../../../../resources/types/fields/editProjectFields";
import { ASSIGN_MEMBER_TO_PROJECT, PROJECT_TEAM_MEMBERS } from "../../../../resources/constants/strings";

import {
  getProjectRoutine,
  editProjectRoutine,
  getProjectComponentsRoutine,
  getProjectTeamMembersRoutine,
  assignProjectTeamMemberRoutine,
} from "../../../data/project/project.routine";

import {
  EPhase,
  IProject,
  IGetProjectTriggerPayload,
  IEditProjectTriggerPayload,
  IGetTeamMembersTriggerPayload,
  IAssignTeamMemberTriggerPayload,
  IGetProjectComponentsTriggerPayload,
} from "../../../../resources/types/project.type";

import "./ProjectPage.style.scss";

export interface IProjectPageOwnProps {
  staff: IUser[];
  loading: number;
  teamMembers: IUser[];
  project: IProject | null;
  components: IComponent[];

  onGetStaff: () => void;
  onGetProject: (payload: IGetProjectTriggerPayload) => void,
  onEditProject: (payload: IEditProjectTriggerPayload) => void,
  onGetTeamMembers: (payload: IGetTeamMembersTriggerPayload) => void,
  onAssignTeamMember: (payload: IAssignTeamMemberTriggerPayload) => void,
  onGetProjectComponents: (payload: IGetProjectComponentsTriggerPayload) => void,
}

export interface IProjectPageInjectedProps extends RouteComponentProps<IIdRouteParam> {}
export interface IProjectPageProps extends IProjectPageOwnProps, IProjectPageInjectedProps {}

interface IState {
  isEditing: boolean;
  showTeamMembersModal: boolean;
  showAssignMembersModal: boolean;

  editInfo: {
    [EEditProjectFields.NAME]: string;
    [EEditProjectFields.PHASE]: EPhase;
    [EEditProjectFields.DESCRIPTION]: string;
  };
}

const initialEditInfo = {
  [EEditProjectFields.NAME]: "",
  [EEditProjectFields.DESCRIPTION]: "",
  [EEditProjectFields.PHASE]: EPhase.INITIAL,
};

class ProjectPage extends Component<IProjectPageProps, IState> {
  constructor(props: IProjectPageProps) {
    super(props);

    this.state = {
      isEditing: false,
      editInfo: initialEditInfo,
      showTeamMembersModal: false,
      showAssignMembersModal: false,
    }
  }

  componentDidMount(): void {
    const { match, onGetStaff, onGetProject, onGetProjectComponents, onGetTeamMembers } = this.props;

    const { id } = match.params;

    onGetStaff();
    onGetProject({ id });
    onGetTeamMembers({ id });
    onGetProjectComponents({ id });
  }

  onStartEditing = (): void => {
    const { project } = this.props;

    if (project) {
      this.setState({
        isEditing: true,
        editInfo: {
          [EEditProjectFields.NAME]: project.name,
          [EEditProjectFields.PHASE]: project.phase,
          [EEditProjectFields.DESCRIPTION]: project.description,
        }
      });
    }
  }

  onEndEditing = (): void => {
    this.setState({ isEditing: false, editInfo: initialEditInfo });
  }

  onSaveEditing = (): void => {
    const { editInfo } = this.state;
    const { match, onEditProject } = this.props;

    const { id } = match.params;
    onEditProject({ id, ...editInfo });

    this.onEndEditing();
  }

  onCreateComponent = () => {
    const { match, history } = this.props;

    const { id } = match.params;
    history.push(`${id}/create-component`);
  }

  onOpenComponent = (id: string): void => {
    const { match, history } = this.props;

    const { id: projectId } = match.params;
    history.push(`${projectId}/component/${id}`);
  };

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
    const { match, onAssignTeamMember } = this.props;
    const { id } = match.params;

    onAssignTeamMember({ id, teamMemberId });
    this.onToggleAssignMembersModal();
  }

  onChangeField = (field: EEditProjectFields, value: string | EPhase): void => {
    // @ts-ignore
    this.setState((prevState) => {
      return {
        editInfo: {
          ...prevState.editInfo,
          [field]: value,
        }
      }
    });
  }

  render(): ReactNode {
    const { staff, project, components, teamMembers } = this.props;
    const { isEditing, editInfo, showTeamMembersModal, showAssignMembersModal } = this.state;

    if (!project) {
      return null;
    }

    return (
      <div className="b-project-page">
        <ProjectInfo
          project={project}
          editInfo={editInfo}
          isEditing={isEditing}
          onEndEditing={this.onEndEditing}
          onSaveEditing={this.onSaveEditing}
          onChangeField={this.onChangeField}
          onStartEditing={this.onStartEditing}
        />

        <div className="project-table-container">
          <div className="project-button-container">
            <IconButton className="project-button" onClick={this.onToggleTeamMembersModal}>
              <GroupIcon />
            </IconButton>

            <IconButton className="project-button" onClick={this.onCreateComponent}>
              <AddIcon />
            </IconButton>
          </div>


          <ComponentTable components={components} onClick={this.onOpenComponent} />
        </div>

        <MembersModal
          users={teamMembers}
          open={showTeamMembersModal}
          title={PROJECT_TEAM_MEMBERS}
          onClose={this.onToggleTeamMembersModal}
          onAddMember={this.onOpenAssignMemberModal}
        />

        <AssignMembersModal
          users={staff}
          open={showAssignMembersModal}
          title={ASSIGN_MEMBER_TO_PROJECT}
          onAddMember={this.onAssignTeamMember}
          onClose={this.onToggleAssignMembersModal}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { staff } = state.organizationReducer;
  const { loading, selectedProject, selectedProjectComponents, selectedProjectTeamMembers } = state.projectReducer;

  return {
    staff,
    loading,
    project: selectedProject,
    components: selectedProjectComponents,
    teamMembers: selectedProjectTeamMembers,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onGetStaff: () => dispatch(getStaffRoutine.trigger()),
    onGetProject: (payload: IGetProjectTriggerPayload) => dispatch(getProjectRoutine.trigger(payload)),
    onEditProject: (payload: IEditProjectTriggerPayload) => dispatch(editProjectRoutine.trigger(payload)),
    onGetTeamMembers: (payload: IGetTeamMembersTriggerPayload) => dispatch(getProjectTeamMembersRoutine.trigger(payload)),
    onAssignTeamMember: (payload: IAssignTeamMemberTriggerPayload) => dispatch(assignProjectTeamMemberRoutine.trigger(payload)),
    onGetProjectComponents: (payload: IGetProjectComponentsTriggerPayload) => dispatch(getProjectComponentsRoutine.trigger(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
