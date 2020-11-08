import React, { Component, ReactNode, ReactNodeArray } from "react";

import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import LaunchIcon from "@material-ui/icons/Launch";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";

import { IProject } from "../../../../../../resources/types/project.type";
import { TStringCallback } from "../../../../../../resources/types/common.type";

import {
  EDIT,
  DESCRIPTION,
  LAST_UPDATE,
  PROJECT_NAME,
  CREATION_DATE, VIEW
} from "../../../../../../resources/constants/strings";

export interface IProjectTableOwnProps {
  projects: IProject[];
  onOpen: TStringCallback;
  onEdit: TStringCallback;
}

export interface IProjectTableInjectedProps {}
export interface IProjectTableProps extends IProjectTableOwnProps, IProjectTableInjectedProps {}

class ProjectTable extends Component<IProjectTableProps> {
  onOpen = (id: string) => (): void => {
    const { onOpen } = this.props;
    onOpen(id);
  }

  onEdit = (id: string) => (): void => {
    const { onEdit } = this.props;
    onEdit(id);
  }

  renderBody(): ReactNodeArray {
    const { projects } = this.props;

    return projects.map((project) => {
      return (
        <TableRow key={project.id}>
          <TableCell component="th" scope="row">
            {project.name}
          </TableCell>
          <TableCell>{project.description}</TableCell>
          <TableCell>{project.createdAt}</TableCell>
          <TableCell>{project.updatedAt}</TableCell>

          <TableCell align="center">
            <IconButton onClick={this.onEdit(project.id)}>
              <EditIcon />
            </IconButton>
          </TableCell>

          <TableCell align="center">
            <IconButton onClick={this.onOpen(project.id)}>
              <LaunchIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      )
    });
  }

  render(): ReactNode {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="project table">
          <TableHead>
            <TableRow>
              <TableCell>{PROJECT_NAME}</TableCell>
              <TableCell>{DESCRIPTION}</TableCell>
              <TableCell>{CREATION_DATE}</TableCell>
              <TableCell>{LAST_UPDATE}</TableCell>
              <TableCell align="center">{EDIT}</TableCell>
              <TableCell align="center">{VIEW}</TableCell>
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
