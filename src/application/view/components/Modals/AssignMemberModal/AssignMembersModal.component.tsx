import React, { Component, ReactNode, ReactNodeArray } from "react";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import {
  List,
  Modal,
  Avatar,
  ListItem,
  Checkbox,
  ModalProps,
  Typography,
  IconButton,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
} from "@material-ui/core";

import { IUser } from "../../../../../resources/types/user.type";
import { TStringCallback } from "../../../../../resources/types/common.type";

import "./AssignMembersModal.style.scss";

export interface IAssignMembersModalOwnProps {
  users: IUser[];
  onAddMember: TStringCallback;
}

export interface IAssignMembersModalInjectedProps extends Omit<ModalProps, "children"> {}
export interface IAssignMembersModalProps extends IAssignMembersModalOwnProps, IAssignMembersModalInjectedProps {}

interface IState {
  selectedUserId: string | null;
}

class AssignMembersModal extends Component<IAssignMembersModalProps, IState> {
  constructor(props: IAssignMembersModalProps) {
    super(props);

    this.state = {
      selectedUserId: null,
    }
  }

  onAddMember = (): void => {
    const { onAddMember } = this.props;
    const { selectedUserId } = this.state;

    if (selectedUserId) {
      onAddMember(selectedUserId);
      this.setState({ selectedUserId: null });
    }
  }

  onClose = (): void => {
    const { onClose } = this.props;

    if (onClose) {
      // @ts-ignore
      onClose();
    }
  }

  onSelectUser = (id: string) => (): void => {
    this.setState((prevState) => {
      if (prevState.selectedUserId === id) {
        return { selectedUserId: null };
      }

      return {
        selectedUserId: id,
      };
    });
  }

  renderListItems(): ReactNodeArray {
    const { users } = this.props;
    const { selectedUserId } = this.state;

    return users.map((user) => {
      const { id, email, userDetails } = user;
      const { firstName, lastName, avatarUrl } = userDetails;

      const isSelected = selectedUserId === id;
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

          <ListItemSecondaryAction>
            <Checkbox
              edge="end"
              checked={isSelected}
              onChange={this.onSelectUser(id)}
            />
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  }

  render(): ReactNode {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { title, onClose, onAddMember, ...modalProps } = this.props;

    return (
      <Modal {...modalProps} onClose={onClose} className="b-assign-members-modal">
        <div className="paper">
          <div className="title">{title}</div>

          <List>
            {this.renderListItems()}
          </List>

          <div className="buttons-container">
            <IconButton className="close-button" onClick={this.onClose}>
              <CloseIcon />
            </IconButton>

            <IconButton className="save-button" onClick={this.onAddMember}>
              <AddIcon />
            </IconButton>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AssignMembersModal;
