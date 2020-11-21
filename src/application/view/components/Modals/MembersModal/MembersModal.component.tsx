import React, { Component, ReactNode, ReactNodeArray } from "react";

import CloseIcon from "@material-ui/icons/Close";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import {
  List,
  Modal,
  Avatar,
  ListItem,
  ModalProps,
  Typography,
  IconButton,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";

import { IUser } from "../../../../../resources/types/user.type";
import { TCallback } from "../../../../../resources/types/common.type";

import "./MembersModal.style.scss";

export interface IMembersModalOwnProps {
  users: IUser[];
  onAddMember: TCallback;
}

export interface IMembersModalInjectedProps extends Omit<ModalProps, "children"> {}
export interface IMembersModalProps extends IMembersModalOwnProps, IMembersModalInjectedProps {}

class MembersModal extends Component<IMembersModalProps> {
  onClose = (): void => {
    const { onClose } = this.props;
    if (onClose) {
      // @ts-ignore
      onClose();
    }
  }

  renderListItems(): ReactNodeArray {
    const { users } = this.props;

    return users.map((user) => {
      const { id, email, userDetails } = user;
      const { firstName, lastName, avatarUrl } = userDetails;
      const fullName = `${firstName} ${lastName}`;

      return (
        <ListItem key={id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={fullName} src={avatarUrl!}/>
          </ListItemAvatar>
          <ListItemText
            primary={fullName}
            secondary={
              <Typography component="span" variant="body2" color="textPrimary">
                {email}
              </Typography>
            }
          />
        </ListItem>
      );
    });
  }

  render(): ReactNode {
    const { title, onClose, onAddMember, ...modalProps } = this.props;

    return (
      <Modal {...modalProps} onClose={onClose} className="b-members-modal">
        <div className="paper">
          <div className="title">{title}</div>

          <List>
            {this.renderListItems()}
          </List>

          <div className="buttons-container">
            <IconButton className="close-button" onClick={this.onClose}>
              <CloseIcon />
            </IconButton>

            <IconButton className="save-button" onClick={onAddMember}>
              <PersonAddIcon />
            </IconButton>
          </div>
        </div>
      </Modal>
    );
  }
}

export default MembersModal;
