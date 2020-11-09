import React, { ChangeEvent, Component, ReactNode } from "react";
import { IconButton, Input, Modal, ModalProps } from "@material-ui/core";

import { TCallback } from "../../../../resources/types/common.type";
import { ECreateProjectFields } from "../../../../resources/types/fields/createProjectFields";
import { CREATE_PROJECT, DESCRIPTION, PROJECT_NAME } from "../../../../resources/constants/strings";

import "./CreateProjectModal.style.scss";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";

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

          <Input
            value={name}
            className="input"
            placeholder={PROJECT_NAME}
            onChange={this.onChangeField(ECreateProjectFields.NAME)}
          />

          <Input
            multiline
            className="input"
            value={description}
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
