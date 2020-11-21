import React, { Component, ReactNode } from "react";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";

import { IComponent } from "../../../../../../resources/types/component.type";
import { TStringCallback } from "../../../../../../resources/types/common.type";

import {
  PHASE,
  SPENT_TIME,
  LAST_UPDATE,
  DESCRIPTION,
  CREATION_DATE,
  COMPONENT_NAME,
  ESTIMATED_TIME,
} from "../../../../../../resources/constants/strings";

import "./ComponentTable.style.scss";

export interface IComponentTableOwnProps {
  components: IComponent[];
  onClick: TStringCallback;
}

export interface IComponentTableInjectedProps {}
export interface IComponentTableProps extends IComponentTableOwnProps, IComponentTableInjectedProps {}

class ComponentTable extends Component<IComponentTableProps> {
  onOpen = (id: string) => (): void => {
    const { onClick } = this.props;
    onClick(id);
  }

  renderBody(): ReactNode {
    const { components } = this.props;

    return components.map((component) => (
      <TableRow hover className="component-table-row" key={component.id} onClick={this.onOpen(component.id)}>
        <TableCell component="th" scope="row">
          {component.name}
        </TableCell>
        <TableCell>{component.description}</TableCell>
        <TableCell>{component.phase}</TableCell>
        <TableCell>{component.spentTime}</TableCell>
        <TableCell>{component.estimatedTime}</TableCell>
        <TableCell>{new Date(component.createdAt).toLocaleString()}</TableCell>
        <TableCell>{new Date(component.updatedAt!).toLocaleString()}</TableCell>
      </TableRow>
    ));
  }

  render(): ReactNode {
    return (
      <TableContainer component={Paper} className="b-component-table">
        <Table aria-label="component table">
          <TableHead>
            <TableRow>
              <TableCell>{COMPONENT_NAME}</TableCell>
              <TableCell>{DESCRIPTION}</TableCell>
              <TableCell>{PHASE}</TableCell>
              <TableCell>{SPENT_TIME}</TableCell>
              <TableCell>{ESTIMATED_TIME}</TableCell>
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

export default ComponentTable;
