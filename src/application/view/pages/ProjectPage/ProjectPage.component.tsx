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
import { PROJECT_TEAM_MEMBERS } from "../../../../resources/constants/strings";
import { getStaffRoutine } from "../../../data/organization/organization.routine";
import { EEditProjectFields } from "../../../../resources/types/fields/editProjectFields";

import {
  getProjectRoutine,
  editProjectRoutine,
  getProjectComponentsRoutine,
  getProjectTeamMembersRoutine,
} from "../../../data/project/project.routine";

import {
  EPhase,
  IProject,
  IGetProjectTriggerPayload,
  IEditProjectTriggerPayload,
  IGetTeamMembersTriggerPayload,
  IGetProjectComponentsTriggerPayload,
} from "../../../../resources/types/project.type";

import "./ProjectPage.style.scss";

export interface IProjectPageOwnProps {
  loading: number;
  teamMembers: IUser[];
  project: IProject | null;
  components: IComponent[];

  onGetStaff: () => void;
  onGetProject: (payload: IGetProjectTriggerPayload) => void,
  onEditProject: (payload: IEditProjectTriggerPayload) => void,
  onGetTeamMembers: (payload: IGetTeamMembersTriggerPayload) => void,
  onGetProjectComponents: (payload: IGetProjectComponentsTriggerPayload) => void,
}

export interface IProjectPageInjectedProps extends RouteComponentProps<IIdRouteParam> {}
export interface IProjectPageProps extends IProjectPageOwnProps, IProjectPageInjectedProps {}

interface IState {
  isEditing: boolean;
  showTeamMembersModal: boolean;

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

  onToggleTeamMembersModal = () => {
    this.setState((prevState) => ({
      showTeamMembersModal: !prevState.showTeamMembersModal,
    }));
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
    const { project, components, teamMembers } = this.props;
    const { isEditing, editInfo, showTeamMembersModal } = this.state;

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
          onAddMember={() => {console.info("s")}}
          open={showTeamMembersModal}
          title={PROJECT_TEAM_MEMBERS}
          onClose={this.onToggleTeamMembersModal}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { loading, selectedProject, selectedProjectComponents, selectedProjectTeamMembers } = state.projectReducer;

  return {
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
    onGetProjectComponents: (payload: IGetProjectComponentsTriggerPayload) => dispatch(getProjectComponentsRoutine.trigger(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
