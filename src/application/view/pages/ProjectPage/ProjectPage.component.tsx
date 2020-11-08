import React, { Component, ReactNode } from "react";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { IRootReducer } from "../../../data/root.reducer";
import { ProjectInfo } from "../../components/ProjectInfo";
import { IIdRouteParam } from "../../../../resources/types/common.type";
import { EEditProjectFields } from "../../../../resources/types/fields/editProjectFields";
import { editProjectRoutine, getProjectRoutine } from "../../../data/project/project.routine";

import {
  EPhase,
  IProject,
  IGetProjectTriggerPayload,
  IEditProjectTriggerPayload,
} from "../../../../resources/types/project.type";

import "./ProjectPage.style.scss";

export interface IProjectPageOwnProps {
  loading: number;
  project: IProject | null;

  onGetProject: (payload: IGetProjectTriggerPayload) => void,
  onEditProject: (payload: IEditProjectTriggerPayload) => void,
}

export interface IProjectPageInjectedProps extends RouteComponentProps<IIdRouteParam> {}
export interface IProjectPageProps extends IProjectPageOwnProps, IProjectPageInjectedProps {}

interface IState {
  isEditing: boolean;
  editInfo: {
    [EEditProjectFields.NAME]: string;
    [EEditProjectFields.PHASE]: EPhase;
    [EEditProjectFields.DESCRIPTION]: string;
  };
}

class ProjectPage extends Component<IProjectPageProps, IState> {
  constructor(props: IProjectPageProps) {
    super(props);

    this.state = {
      isEditing: false,
      editInfo: {
        [EEditProjectFields.NAME]: "",
        [EEditProjectFields.DESCRIPTION]: "",
        [EEditProjectFields.PHASE]: EPhase.INITIAL,
      },
    }
  }

  componentDidMount(): void {
    const { match, onGetProject } = this.props;

    const { id } = match.params;
    onGetProject({ id });
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
    this.setState({ isEditing: false });
  }

  onSaveEditing = (): void => {
    const { editInfo } = this.state;
    const { match, onEditProject } = this.props;

    const { id } = match.params;
    onEditProject({ id, ...editInfo });

    this.onEndEditing();
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
    const { project } = this.props;
    const { isEditing, editInfo } = this.state;

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
      </div>
    );
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { loading, selectedProject } = state.projectReducer;

  return {
    loading,
    project: selectedProject,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onGetProject: (payload: IGetProjectTriggerPayload) => dispatch(getProjectRoutine.trigger(payload)),
    onEditProject: (payload: IEditProjectTriggerPayload) => dispatch(editProjectRoutine.trigger(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
