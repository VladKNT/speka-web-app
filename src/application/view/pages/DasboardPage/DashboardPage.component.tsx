import React, { Component, ReactNode } from "react";

import { Dispatch } from "redux";
import { connect } from "react-redux";

import { IRootReducer } from "../../../data/root.reducer";
import { IProject } from "../../../../resources/types/project.type";
import { TCallback } from "../../../../resources/types/common.type";
import { ProjectTable } from "../../components/UI/Tables/ProjectTable";
import { getProjectsRoutine } from "../../../data/project/project.routine";

export interface IDashboardPageOwnProps {
  loading: number;
  projects: IProject[];
  getProjects: TCallback;
}

export interface IDashboardPageInjectedProps {}
export interface IDashboardPageProps extends IDashboardPageOwnProps, IDashboardPageInjectedProps {}

class DashboardPage extends Component<IDashboardPageProps> {
  componentDidMount(): void {
    const { getProjects } = this.props;
    getProjects();
  }

  onOpenProject = (id: string): void => {
    console.info(id);
  }

  onEditProject = (id: string): void => {
    console.info(id);
  }

  render(): ReactNode {
    const { projects } = this.props;

    return (
      <div>
        <ProjectTable
          projects={projects}
          onOpen={this.onOpenProject}
          onEdit={this.onEditProject}
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
