import React, { Component, ReactNode, ReactNodeArray } from "react";

import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";

import { IProject } from "../../../../../../resources/types/project.type";
import { TStringCallback } from "../../../../../../resources/types/common.type";

import {
  PHASE,
  DESCRIPTION,
  LAST_UPDATE,
  PROJECT_NAME,
  CREATION_DATE,
} from "../../../../../../resources/constants/strings";

import "./ProjectTable.style.scss";

export interface IProjectTableOwnProps {
  projects: IProject[];
  onClick: TStringCallback;
}

export interface IProjectTableInjectedProps {}
export interface IProjectTableProps extends IProjectTableOwnProps, IProjectTableInjectedProps {}

class ProjectTable extends Component<IProjectTableProps> {
  onOpen = (id: string) => (): void => {
    const { onClick } = this.props;
    onClick(id);
  }

  renderBody(): ReactNodeArray {
    const { projects } = this.props;

    return projects.map((project) => {
      return (
        <TableRow hover className="project-table-row" key={project.id} onClick={this.onOpen(project.id)}>
          <TableCell component="th" scope="row">
            {project.name}
          </TableCell>
          <TableCell>{project.description}</TableCell>
          <TableCell>{project.phase}</TableCell>
          <TableCell>{new Date(project.createdAt).toLocaleString()}</TableCell>
          <TableCell>{new Date(project.updatedAt!).toLocaleString()}</TableCell>
        </TableRow>
      )
    });
  }

  render(): ReactNode {
    return (
      <TableContainer component={Paper} className="b-project-table">
        <Table aria-label="project table">
          <TableHead>
            <TableRow>
              <TableCell>{PROJECT_NAME}</TableCell>
              <TableCell>{DESCRIPTION}</TableCell>
              <TableCell>{PHASE}</TableCell>
              <TableCell>{CREATION_DATE}</TableCell>
              <TableCell>{LAST_UPDATE}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.renderBody()}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default ProjectTable;
