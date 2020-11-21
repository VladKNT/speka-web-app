import React, { Component, ReactNode, ReactNodeArray } from "react";

import classNames from "classnames";
import { Select } from "@material-ui/core";

import { Editor } from "../../UI/Inputs/Editor";
import { EditButtons } from "../../UI/Buttons/EditButtons";
import { differ } from "../../../../../utils/differ/differ";
import { IComponentDetails } from "../../../../../resources/types/component.type";
import { TCallback, TNumberCallback } from "../../../../../resources/types/common.type";

import {
  NOTES,
  FEATURES,
  REQUIREMENTS,
  CURRENT_VERSION,
  FUTURE_FEATURES,
  COMPARE_VERSION,
} from "../../../../../resources/constants/strings";

import {
  EEditComponentDetailsFields,
  IEditComponentDetailsFields,
} from "../../../../../resources/types/fields/editComponentFields";

import "./ComponentDetailsInfo.style.scss";

export interface IComponentDetailsInfoOwnProps {
  isEditing: boolean;
  currentVersion: number;
  compareVersion: number;
  componentDetailsFields: IEditComponentDetailsFields;
  comparisonComponentDetails: IComponentDetails | null;

  onEndEditing: TCallback;
  onSaveEditing: TCallback;
  onStartEditing: TCallback;
  onChangeCompareVersion: TNumberCallback;
  onChange: (field: EEditComponentDetailsFields, value: string) => void;
}

export interface IComponentDetailsInfoInjectedProps {}
export interface IComponentDetailsInfoProps extends IComponentDetailsInfoOwnProps, IComponentDetailsInfoInjectedProps {}

class ComponentDetailsInfo extends Component<IComponentDetailsInfoProps> {
  onChange = (field: EEditComponentDetailsFields) => (value: string): void => {
    const { onChange } = this.props;
    onChange(field, value);
  };

  onChangeCompareVersion = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    const { onChangeCompareVersion } = this.props;

    // @ts-ignore
    const value: number = parseInt(event.target.value, 10);
    onChangeCompareVersion(value);
  }

  renderCompareVersions = (): ReactNodeArray => {
    const { currentVersion } = this.props;

    const versions: ReactNodeArray = [
      <option key={0} aria-label="None" value={0} />
    ];

    for (let i = 1; i <= currentVersion; i++) {
      versions.push(
        <option key={i} value={i}>{i}</option>
      );
    }

    return versions;
  }

  renderControlContainer(): ReactNode {
    const { isEditing,  compareVersion, onEndEditing, onSaveEditing, onStartEditing, currentVersion } = this.props;

    return (
      <div className="control-container">
        <div className="version-control-container">
          <div className="field-wrapper">
            <label className="label">{CURRENT_VERSION}</label>
            {currentVersion}
          </div>

          <div className="field-wrapper">
            <label className="label">{COMPARE_VERSION}</label>
            <Select native value={compareVersion} onChange={this.onChangeCompareVersion}>
              {this.renderCompareVersions()}
            </Select>
          </div>
        </div>

        <EditButtons
          onEnd={onEndEditing}
          isEditing={isEditing}
          onSave={onSaveEditing}
          onStart={onStartEditing}
        />
      </div>
    )
  }

  renderEditingFields(): ReactNode {
    const { isEditing, componentDetailsFields, comparisonComponentDetails } = this.props;
    const { notes, features, futureFeatures, requirements } = componentDetailsFields;

    return (
      <div className={classNames("editing-fields", { "editing-fields-comparison": comparisonComponentDetails })}>
        <Editor
          label={FEATURES}
          disabled={!isEditing}
          data={features}
          onChange={this.onChange(EEditComponentDetailsFields.FEATURES)}
        />

        <Editor
          disabled={!isEditing}
          label={FUTURE_FEATURES}
          data={futureFeatures}
          onChange={this.onChange(EEditComponentDetailsFields.FUTURE_FEATURES)}
        />

        <Editor
          data={requirements}
          label={REQUIREMENTS}
          disabled={!isEditing}
          onChange={this.onChange(EEditComponentDetailsFields.REQUIREMENTS)}
        />

        <Editor
          label={NOTES}
          data={notes}
          disabled={!isEditing}
          onChange={this.onChange(EEditComponentDetailsFields.NOTES)}
        />
      </div>
    )
  }

  renderComparisonEditingFields(): ReactNode {
    const { componentDetailsFields, comparisonComponentDetails } = this.props;

    if (!comparisonComponentDetails) {
      return null;
    }

    const { notes, features, futureFeatures, requirements } = comparisonComponentDetails;

    return (
      <div className={classNames("editing-fields", "editing-fields-comparison")}>
        <Editor
          disabled
          label={FEATURES}
          data={differ(features, componentDetailsFields[EEditComponentDetailsFields.FEATURES])}
        />

        <Editor
          disabled
          label={FUTURE_FEATURES}
          data={differ(futureFeatures, componentDetailsFields[EEditComponentDetailsFields.FUTURE_FEATURES])}
        />

        <Editor
          disabled
          label={REQUIREMENTS}
          data={differ(requirements, componentDetailsFields[EEditComponentDetailsFields.REQUIREMENTS])}
        />

        <Editor
          disabled
          label={NOTES}
          data={differ(notes, componentDetailsFields[EEditComponentDetailsFields.NOTES])}
        />
      </div>
    );
  }

  render(): ReactNode {
    return (
      <div className="b-component-details-info">
        {this.renderControlContainer()}

        <div className="fields-container">
          {this.renderEditingFields()}
          {this.renderComparisonEditingFields()}
        </div>
      </div>
    );
  }
}

export default ComponentDetailsInfo;
