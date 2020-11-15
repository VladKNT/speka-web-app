import React, { PureComponent, ReactNode } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { IUser } from "../../../../../resources/types/user.type";
import { SPEKA } from "../../../../../resources/constants/strings";
import { TCallback } from "../../../../../resources/types/common.type";

import "./Header.style.scss";
import {Link} from "react-router-dom";

export interface IHeaderOwnProps {
  currentUser: IUser;
  onSignOut: TCallback;
}

export interface IHeaderInjectedProps {}
export interface IHeaderProps extends IHeaderOwnProps, IHeaderInjectedProps {}

class Header extends PureComponent<IHeaderProps> {
  renderLeftSection(): ReactNode {
    const { name, logoUrl } = this.props.currentUser.organization;

    return (
      <Link to="/" className="header-link">
        <span className="header-left-section">
          {logoUrl &&
            <img src={logoUrl} className="organization-logo" alt="organization-logo" />
          }

          <h1 className="organization-name">{name}</h1>
        </span>
      </Link>
    );
  }

  renderUserAvatar(): ReactNode {
    const { avatarUrl } = this.props.currentUser.userDetails;

    if (avatarUrl) {
      return <img src={avatarUrl} className="user-avatar" alt="user-avatar" />
    }

    return <AccountCircleIcon className="user-avatar" />
  }

  renderRightSection(): ReactNode {
    const { currentUser, onSignOut } = this.props;
    const { firstName, lastName } = currentUser.userDetails;

    const fullName = `${firstName} ${lastName}`;

    return (
      <span className="header-right-section">
        <label>{fullName}</label>

        <div onClick={onSignOut}>
          {this.renderUserAvatar()}
        </div>
      </span>
    );
  }

  renderCentralSection(): ReactNode {
    return (
      <div className="header-central-section">
        <label className="header-brand">{SPEKA}</label>
      </div>
    )
  }

  render(): ReactNode {
    return (
      <div className="b-header">
        {this.renderLeftSection()}
        {this.renderCentralSection()}
        {this.renderRightSection()}
      </div>
    );
  }
}

export default Header;
