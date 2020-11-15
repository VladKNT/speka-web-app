import React, { ChangeEvent, Component, MouseEvent, ReactNode } from "react";

import { TextField } from "@material-ui/core";

import { Editor } from "../UI/Inputs/Editor";
import { PrimaryButton } from "../UI/Buttons/PrimaryButton";
import { TCallback } from "../../../../resources/types/common.type";

import {
  SAVE,
  NOTES,
  FEATURES,
  DESCRIPTION,
  PROJECT_NAME,
  REQUIREMENTS,
  ESTIMATED_TIME,
  FUTURE_FEATURES,
} from "../../../../resources/constants/strings";

import {
  ECreateComponentFields,
  ECreateComponentDetailsFields
} from "../../../../resources/types/fields/createComponentField";

import "./CreateComponentFrom.style.scss";

export interface ICreateComponentFromOwnProps {
  componentInfo: {
    [ECreateComponentFields.NAME]: string;
    [ECreateComponentFields.DESCRIPTION]: string;
    [ECreateComponentFields.ESTIMATED_TIME]: string;
  };

  componentDetailsInfo: {
    [ECreateComponentDetailsFields.NOTES]: string;
    [ECreateComponentDetailsFields.FEATURES]: string;
    [ECreateComponentDetailsFields.REQUIREMENTS]: string;
    [ECreateComponentDetailsFields.FUTURE_FEATURES]: string;
  };

  onSave: TCallback;
  onChangeComponentInfo: (field: ECreateComponentFields, value: string) => void;
  onChangeComponentDetailsInfo: (field: ECreateComponentDetailsFields, value: string) => void;
}

export interface ICreateComponentFromInjectedProps {}
export interface ICreateComponentFromProps extends ICreateComponentFromOwnProps, ICreateComponentFromInjectedProps {}

class CreateComponentForm extends Component<ICreateComponentFromProps> {
  onChangeComponentInfo = (field: ECreateComponentFields) => (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    const { onChangeComponentInfo } = this.props;

    onChangeComponentInfo(field, value);
  };

  onChangeComponentDetailsInfo = (field: ECreateComponentDetailsFields) => (value: string): void => {
    const { onChangeComponentDetailsInfo } = this.props;
    onChangeComponentDetailsInfo(field, value);
  };

  onSubmit = (event: MouseEvent<HTMLButtonElement>):void => {
    event.preventDefault();
    const { onSave } = this.props;

    onSave();
  }

  renderComponentInfo(): ReactNode {
    const { name, description, estimatedTime } = this.props.componentInfo;

    return (
      <div className="component-info-content">
        <div className="row">
          <TextField
            value={name}
            className="input"
            variant="outlined"
            label={PROJECT_NAME}
            placeholder={PROJECT_NAME}
            onChange={this.onChangeComponentInfo(ECreateComponentFields.NAME)}
          />

          <div className="spacer" />

          <TextField
            type="number"
            className="input"
            variant="outlined"
            value={estimatedTime}
            label={ESTIMATED_TIME}
            placeholder={ESTIMATED_TIME}
            onChange={this.onChangeComponentInfo(ECreateComponentFields.ESTIMATED_TIME)}
          />
        </div>

        <TextField
          multiline
          className="input"
          variant="outlined"
          value={description}
          label={DESCRIPTION}
          placeholder={DESCRIPTION}
          onChange={this.onChangeComponentInfo(ECreateComponentFields.DESCRIPTION)}
        />
      </div>
    );
  }

  renderComponentDetailsInfo(): ReactNode {
    const { notes, features, requirements, futureFeatures } = this.props.componentDetailsInfo;

    return (
      <div className="component-info-content">
        <Editor
          data={features}
          label={FEATURES}
          onChange={this.onChangeComponentDetailsInfo(ECreateComponentDetailsFields.FEATURES)}
        />

        <Editor
          data={futureFeatures}
          label={FUTURE_FEATURES}
          onChange={this.onChangeComponentDetailsInfo(ECreateComponentDetailsFields.FUTURE_FEATURES)}
        />

        <Editor
          data={requirements}
          label={REQUIREMENTS}
          onChange={this.onChangeComponentDetailsInfo(ECreateComponentDetailsFields.REQUIREMENTS)}
        />

        <Editor
          data={notes}
          label={NOTES}
          onChange={this.onChangeComponentDetailsInfo(ECreateComponentDetailsFields.NOTES)}
        />
      </div>
    );
  }

  render(): ReactNode {
    return (
      <form className="b-create-component-form">
        {this.renderComponentInfo()}
        {this.renderComponentDetailsInfo()}

        <PrimaryButton text={SAVE} className="component-save-btn" onClick={this.onSubmit} />
      </form>
    );
  }
}

export default CreateComponentForm;
