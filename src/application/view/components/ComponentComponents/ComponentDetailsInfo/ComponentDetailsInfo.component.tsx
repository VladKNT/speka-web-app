import React, { Component, ReactNode } from "react";

import { Editor } from "../../UI/Inputs/Editor";
import { EditButtons } from "../../UI/Buttons/EditButtons";
import { TCallback } from "../../../../../resources/types/common.type";
import { IComponentDetails } from "../../../../../resources/types/component.type";
import { FEATURES, FUTURE_FEATURES, NOTES, REQUIREMENTS } from "../../../../../resources/constants/strings";

import {
  EEditComponentDetailsFields,
  IEditComponentDetailsFields,
} from "../../../../../resources/types/fields/editComponentFields";

import "./ComponentDetailsInfo.style.scss";

export interface IComponentDetailsInfoOwnProps {
  isEditing: boolean;
  componentDetails: IComponentDetails
  componentDetailsEditing: IEditComponentDetailsFields;

  onEndEditing: TCallback;
  onSaveEditing: TCallback;
  onStartEditing: TCallback;
  onChange: (field: EEditComponentDetailsFields, value: string) => void;
}

export interface IComponentDetailsInfoInjectedProps {}
export interface IComponentDetailsInfoProps extends IComponentDetailsInfoOwnProps, IComponentDetailsInfoInjectedProps {}

class ComponentDetailsInfo extends Component<IComponentDetailsInfoProps> {
  onChange = (field: EEditComponentDetailsFields) => (value: string): void => {
    const { onChange } = this.props;
    onChange(field, value);
  };

  renderEditingFields(): ReactNode {
    const { isEditing, componentDetails, componentDetailsEditing } = this.props;
    const { notes, features, futureFeatures, requirements } = componentDetails;

    const {
      notes: notedEditing,
      features: featuresEditing,
      requirements: requirementsEditing,
      futureFeatures: futureFeaturesEditing,
    } = componentDetailsEditing;

    return (
      <div className="editing-fields">
        <Editor
          label={FEATURES}
          disabled={!isEditing}
          data={isEditing ? featuresEditing : features}
          onChange={this.onChange(EEditComponentDetailsFields.FEATURES)}
        />

        <Editor
          disabled={!isEditing}
          label={FUTURE_FEATURES}
          data={isEditing ? futureFeaturesEditing : futureFeatures}
          onChange={this.onChange(EEditComponentDetailsFields.FUTURE_FEATURES)}
        />

        <Editor
          label={REQUIREMENTS}
          disabled={!isEditing}
          data={isEditing ? requirementsEditing : requirements}
          onChange={this.onChange(EEditComponentDetailsFields.REQUIREMENTS)}
        />

        <Editor
          label={NOTES}
          disabled={!isEditing}
          data={isEditing ? notedEditing: notes}
          onChange={this.onChange(EEditComponentDetailsFields.NOTES)}
        />
      </div>
    )
  }


  render(): ReactNode {
    const { isEditing, onEndEditing, onSaveEditing, onStartEditing } = this.props;

    return (
      <div className="b-component-details-info">
        <div className="buttons-container">
          <EditButtons
            onEnd={onEndEditing}
            isEditing={isEditing}
            onSave={onSaveEditing}
            onStart={onStartEditing}
          />
        </div>

        {this.renderEditingFields()}
      </div>
    );
  }
}

export default ComponentDetailsInfo;
