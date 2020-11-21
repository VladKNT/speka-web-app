import React, { Component, ReactNode } from "react";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { IRootReducer } from "../../../data/root.reducer";
import { IComponent } from "../../../../resources/types/component.type";
import { IIdRouteParam } from "../../../../resources/types/common.type";
import { ComponentTable } from "../../components/UI/Tables/ComponentTable";
import { ProjectInfo } from "../../components/ProjectComponents/ProjectInfo";
import { EEditProjectFields } from "../../../../resources/types/fields/editProjectFields";

import {
  editProjectRoutine,
  getProjectRoutine,
  getProjectComponentsRoutine,
} from "../../../data/project/project.routine";

import {
  EPhase,
  IProject,
  IGetProjectTriggerPayload,
  IEditProjectTriggerPayload,
  IGetProjectComponentsTriggerPayload,
} from "../../../../resources/types/project.type";

import "./ProjectPage.style.scss";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

export interface IProjectPageOwnProps {
  loading: number;
  project: IProject | null;
  components: IComponent[];

  onGetProject: (payload: IGetProjectTriggerPayload) => void,
  onEditProject: (payload: IEditProjectTriggerPayload) => void,
  onGetProjectComponents: (payload: IGetProjectComponentsTriggerPayload) => void,
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
    }
  }

  componentDidMount(): void {
    const { match, onGetProject, onGetProjectComponents } = this.props;

    const { id } = match.params;
    onGetProject({ id });
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
    this.props.history.push(`/component/${id}`);
  };

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
    const { project, components } = this.props;
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

        <div className="project-table-container">
          <div className="project-button-container">
            <IconButton className="project-add-button" onClick={this.onCreateComponent}>
              <AddIcon />
            </IconButton>
          </div>

          <ComponentTable components={components} onClick={this.onOpenComponent} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { loading, selectedProject, selectedProjectComponents } = state.projectReducer;

  return {
    loading,
    project: selectedProject,
    components: selectedProjectComponents,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onGetProject: (payload: IGetProjectTriggerPayload) => dispatch(getProjectRoutine.trigger(payload)),
    onEditProject: (payload: IEditProjectTriggerPayload) => dispatch(editProjectRoutine.trigger(payload)),
    onGetProjectComponents: (payload: IGetProjectComponentsTriggerPayload) => dispatch(getProjectComponentsRoutine.trigger(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
