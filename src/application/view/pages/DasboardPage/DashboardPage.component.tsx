import React, { Component, ReactNode } from "react";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { RouteComponentProps } from "react-router-dom";

import { IRootReducer } from "../../../data/root.reducer";
import { TCallback } from "../../../../resources/types/common.type";
import { ProjectTable } from "../../components/UI/Tables/ProjectTable";
import { CreateProjectModal } from "../../components/CreateProjectModal";
import { ECreateProjectFields } from "../../../../resources/types/fields/createProjectFields";
import { createProjectRoutine, getProjectsRoutine } from "../../../data/project/project.routine";
import { ICreateProjectTriggerPayload, IProject } from "../../../../resources/types/project.type";

import "./DashboardPage.style.scss";

export interface IDashboardPageOwnProps {
  loading: number;
  projects: IProject[];
  getProjects: TCallback;
  createProject: (payload: ICreateProjectTriggerPayload) => void;
}

export interface IDashboardPageInjectedProps extends RouteComponentProps {}
export interface IDashboardPageProps extends IDashboardPageOwnProps, IDashboardPageInjectedProps {}

export interface IState {
  isCreationModalOpened: boolean;
  [ECreateProjectFields.NAME]: string;
  [ECreateProjectFields.DESCRIPTION]: string;
}

class DashboardPage extends Component<IDashboardPageProps, IState> {
  constructor(props: IDashboardPageProps) {
    super(props);

    this.state = {
      isCreationModalOpened: false,
      [ECreateProjectFields.NAME]: "",
      [ECreateProjectFields.DESCRIPTION]: "",
    }
  }

  componentDidMount(): void {
    const { getProjects } = this.props;
    getProjects();
  }

  onOpenProject = (id: string): void => {
    this.props.history.push(`project/${id}`);
  };

  onOpenCreateProjectModal = (): void => {
    this.setState({ isCreationModalOpened: true });
  };

  onCloseCreateProjectModal = (): void => {
    this.setState({
      isCreationModalOpened: false,
      [ECreateProjectFields.NAME]: "",
      [ECreateProjectFields.DESCRIPTION]: "",
    });
  };

  onSaveProject = (): void => {
    const { createProject } = this.props;
    const { name, description } = this.state;

    createProject({ name, description });
    this.onCloseCreateProjectModal();
  };

  onChangeField = (field: ECreateProjectFields, value: string): void => {
    // @ts-ignore
    this.setState({ [field]: value });
  };

  render(): ReactNode {
    const { projects } = this.props;
    const { name, description, isCreationModalOpened } = this.state;

    return (
      <div className="b-dashboard-page">
        <div className="dashboard-button-container">
          <IconButton className="dashboard-add-button" onClick={this.onOpenCreateProjectModal}>
            <AddIcon />
          </IconButton>
        </div>

        <CreateProjectModal
          name={name}
          description={description}
          onSave={this.onSaveProject}
          open={isCreationModalOpened}
          onChangeField={this.onChangeField}
          onClose={this.onCloseCreateProjectModal}
        />

        <ProjectTable
          projects={projects}
          onClick={this.onOpenProject}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { loading, projects } = state.projectReducer;

  return {
    loading,
    projects,
  };
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getProjects: () => dispatch(getProjectsRoutine.trigger()),
    createProject: (payload: ICreateProjectTriggerPayload) => dispatch(createProjectRoutine.trigger(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
