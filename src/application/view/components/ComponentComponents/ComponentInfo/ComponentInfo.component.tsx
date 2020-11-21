import React, { ChangeEvent, Component, ReactNode } from "react";

import GroupIcon from "@material-ui/icons/Group";
import { Input, Select } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import { EditButtons } from "../../UI/Buttons/EditButtons";
import { TCallback } from "../../../../../resources/types/common.type";
import { EStatus, IComponent } from "../../../../../resources/types/component.type";
import { EEditComponentFields, IEditComponentFields } from "../../../../../resources/types/fields/editComponentFields";

import {
  PHASE,
  SPENT_TIME,
  DESCRIPTION,
  LAST_UPDATE,
  CREATION_DATE,
  COMPONENT_NAME,
  ESTIMATED_TIME,
} from "../../../../../resources/constants/strings";

import "./ComponentInfo.style.scss";

export interface IComponentInfoOwnProps {
  isEditing: boolean;
  component: IComponent;
  componentEditing: IEditComponentFields;

  onEndEditing: TCallback;
  onSaveEditing: TCallback;
  onStartEditing: TCallback;
  onOpenAssigneesModal: TCallback;
  onChange: (field: EEditComponentFields, value: string) => void;
}

export interface IComponentInfoInjectedProps {}
export interface IComponentInfoProps extends IComponentInfoOwnProps, IComponentInfoInjectedProps {}

class ComponentInfo extends Component<IComponentInfoProps> {
  onChange = (field: EEditComponentFields) => (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    const { onChange } = this.props;

    onChange(field, value);
  };

  onChangePhase = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    const { onChange } = this.props;

    // @ts-ignore
    const value: string = event.target.value;
    onChange(EEditComponentFields.PHASE, value);
  };

  renderName(): ReactNode {
    const { isEditing, component, componentEditing } = this.props;

    if (isEditing) {
      return (
        <Input
          value={componentEditing[EEditComponentFields.NAME]}
          onChange={this.onChange(EEditComponentFields.NAME)}
        />
      );
    }

    return <div>{component.name}</div>;
  }

  renderDescription(): ReactNode {
    const { isEditing, component, componentEditing } = this.props;

    if (isEditing) {
      return (
        <Input
          multiline
          value={componentEditing[EEditComponentFields.DESCRIPTION]}
          onChange={this.onChange(EEditComponentFields.DESCRIPTION)}
        />
      );
    }

    return <div>{component.description}</div>;
  }

  renderPhase(): ReactNode {
    const { isEditing, component, componentEditing } = this.props;

    if (isEditing) {
      return (
        <Select native value={componentEditing[EEditComponentFields.PHASE]} onChange={this.onChangePhase}>
          <option aria-label="None" value="" />
          <option value={EStatus.PLANNING}>{EStatus.PLANNING}</option>
          <option value={EStatus.IN_PROGRESS}>{EStatus.IN_PROGRESS}</option>
          <option value={EStatus.READY_FOR_TESTING}>{EStatus.READY_FOR_TESTING}</option>
          <option value={EStatus.COMPLETED}>{EStatus.COMPLETED}</option>
          <option value={EStatus.CANCELED}>{EStatus.CANCELED}</option>
        </Select>
      );
    }

    return <div>{component.phase}</div>;
  }

  renderEstimatedTime(): ReactNode {
    const { isEditing, component, componentEditing } = this.props;

    if (isEditing) {
      return (
        <Input
          type="number"
          value={componentEditing[EEditComponentFields.ESTIMATED_TIME]}
          onChange={this.onChange(EEditComponentFields.ESTIMATED_TIME)}
        />
      );
    }

    return <div>{component.estimatedTime}</div>;
  }

  renderSpentTime(): ReactNode {
    const { isEditing, component, componentEditing } = this.props;

    if (isEditing) {
      return (
        <Input
          type="number"
          value={componentEditing[EEditComponentFields.SPENT_TIME]}
          onChange={this.onChange(EEditComponentFields.SPENT_TIME)}
        />
      );
    }

    return <div>{component.spentTime}</div>;
  }

  render(): ReactNode {
    const { component, isEditing, onEndEditing, onSaveEditing, onStartEditing, onOpenAssigneesModal } = this.props;

    return (
      <div className="b-component-info">
        <div className="component-info-wrapper">
          <div className="component-info">
            <label className="component-info-title">{COMPONENT_NAME}</label>
            {this.renderName()}
          </div>

          <div className="component-info">
            <label className="component-info-title">{DESCRIPTION}</label>
            {this.renderDescription()}
          </div>

          <div className="component-info">
            <label className="component-info-title">{PHASE}</label>
            {this.renderPhase()}
          </div>
        </div>

        <div className="component-info-wrapper">
          <div className="component-info">
            <label className="component-info-title">{ESTIMATED_TIME}</label>
            <div>{this.renderEstimatedTime()}</div>
          </div>

          <div className="component-info">
            <label className="component-info-title">{SPENT_TIME}</label>
            <div>{this.renderSpentTime()}</div>
          </div>
        </div>

        <div className="component-info-wrapper">
          <div className="component-info">
            <label className="component-info-title">{CREATION_DATE}</label>
            <div>{component.createdAt}</div>
          </div>

          <div className="component-info">
            <label className="component-info-title">{LAST_UPDATE}</label>
            <div>{component.updatedAt}</div>
          </div>
        </div>

        <EditButtons
          onEnd={onEndEditing}
          isEditing={isEditing}
          onSave={onSaveEditing}
          onStart={onStartEditing}
        />

        <IconButton className="assignees-button" onClick={onOpenAssigneesModal}>
          <GroupIcon />
        </IconButton>
      </div>
    );
  }
}

export default ComponentInfo;
