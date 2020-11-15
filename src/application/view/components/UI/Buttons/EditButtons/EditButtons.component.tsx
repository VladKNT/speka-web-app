import React, { Component, ReactNode } from "react";

import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

import { TCallback } from "../../../../../../resources/types/common.type";

import "./EditButtons.style.scss";

export interface IEditButtonsOwnProps {
  onEnd: TCallback;
  onSave: TCallback;
  onStart: TCallback;
  isEditing: boolean;
}

export interface IEditButtonsInjectedProps {}
export interface IEditButtonsProps extends IEditButtonsOwnProps, IEditButtonsInjectedProps {}

class EditButtons extends Component<IEditButtonsProps> {
  render(): ReactNode {
    const { isEditing, onEnd, onSave, onStart } = this.props;

    if (!isEditing) {
      return (
        <div className="b-edit-buttons">
          <IconButton className="edit-button" onClick={onStart}>
            <EditIcon />
          </IconButton>
        </div>
      );
    }

    return (
      <div className="b-edit-buttons">
        <IconButton className="close-button" onClick={onEnd}>
          <CloseIcon />
        </IconButton>
        <IconButton className="save-button" onClick={onSave}>
          <SaveIcon />
        </IconButton>
      </div>
    );
  }
}

export default EditButtons;
