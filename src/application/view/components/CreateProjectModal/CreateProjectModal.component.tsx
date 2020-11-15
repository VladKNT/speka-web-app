import React, { ChangeEvent, Component, ReactNode } from "react";

import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton, Modal, ModalProps, TextField } from "@material-ui/core";

import { TCallback } from "../../../../resources/types/common.type";
import { ECreateProjectFields } from "../../../../resources/types/fields/createProjectFields";
import { CREATE_PROJECT, DESCRIPTION, PROJECT_NAME } from "../../../../resources/constants/strings";

import "./CreateProjectModal.style.scss";

export interface ICreateProjectModalOwnProps {
  [ECreateProjectFields.NAME]: string;
  [ECreateProjectFields.DESCRIPTION]: string;

  onSave: TCallback;
  onChangeField: (field: ECreateProjectFields, value: string) => void;
}

export interface ICreateProjectModalInjectedProps extends Omit<ModalProps, "children"> {}
export interface ICreateProjectModalProps extends ICreateProjectModalOwnProps, ICreateProjectModalInjectedProps {}

class CreateProjectModal extends Component<ICreateProjectModalProps> {
  onChangeField = (field: ECreateProjectFields) => (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    const { onChangeField } = this.props;

    onChangeField(field, value);
  };

  onClose = (): void => {
    const { onClose } = this.props;
    if (onClose) {
      // @ts-ignore
      onClose();
    }
  }

  render(): ReactNode {
    const { name, description, onSave, onClose, ...modalProps } = this.props;

    return (
      <Modal {...modalProps} onClose={onClose} className="b-create-project-modal">
        <div className="paper">
          <label className="title">{CREATE_PROJECT}</label>

          <TextField
            value={name}
            className="input"
            variant="outlined"
            label={PROJECT_NAME}
            placeholder={PROJECT_NAME}
            onChange={this.onChangeField(ECreateProjectFields.NAME)}
          />

          <TextField
            multiline
            className="input"
            variant="outlined"
            value={description}
            label={DESCRIPTION}
            placeholder={DESCRIPTION}
            onChange={this.onChangeField(ECreateProjectFields.DESCRIPTION)}
          />

          <div className="buttons-container">
            <IconButton className="close-button" onClick={this.onClose}>
              <CloseIcon />
            </IconButton>

            <IconButton className="save-button" onClick={onSave}>
              <SaveIcon />
            </IconButton>
          </div>
        </div>
      </Modal>
    );
  }
}

export default CreateProjectModal;
