import React, { ChangeEvent, Component, ReactNode } from "react";

import { Input, Select } from "@material-ui/core";

import { EditButtons } from "../../UI/Buttons/EditButtons";
import { TCallback } from "../../../../../resources/types/common.type";
import { EPhase, IProject } from "../../../../../resources/types/project.type";
import { EEditProjectFields } from "../../../../../resources/types/fields/editProjectFields";
import { CREATION_DATE, DESCRIPTION, LAST_UPDATE, PHASE, PROJECT_NAME } from "../../../../../resources/constants/strings";

import "./ProjectInfo.style.scss";

export interface IProjectInfoOwnProps {
  project: IProject;
  isEditing: boolean;

  onEndEditing: TCallback;
  onSaveEditing: TCallback;
  onStartEditing: TCallback;
  onChangeField: (field: EEditProjectFields, value: string | EPhase) => void;

  editInfo: {
    [EEditProjectFields.NAME]: string;
    [EEditProjectFields.PHASE]: string;
    [EEditProjectFields.DESCRIPTION]: string;
  }
}

export interface IProjectInfoInjectedProps {}
export interface IProjectInfoProps extends IProjectInfoOwnProps,IProjectInfoInjectedProps  {}

class ProjectInfo extends Component<IProjectInfoProps> {
  onChangeField = (field: EEditProjectFields) => (event: ChangeEvent<HTMLInputElement>): void => {
    const { onChangeField } = this.props;
    const { value } = event.target;

    onChangeField(field, value);
  };

  onChangePhase = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    const { onChangeField } = this.props;

    // @ts-ignore
    const value: string = event.target.value;
    onChangeField(EEditProjectFields.PHASE, value);
  };

  renderProjectName(): ReactNode {
    const { isEditing, editInfo, project } = this.props;

    if (isEditing) {
      return (
        <Input
          value={editInfo[EEditProjectFields.NAME]}
          onChange={this.onChangeField(EEditProjectFields.NAME)}
        />
      );
    }

    return <div>{project.name}</div>;
  }

  renderProjectDescription(): ReactNode {
    const { isEditing, editInfo, project } = this.props;

    if (isEditing) {
      return (
        <Input
          multiline
          value={editInfo[EEditProjectFields.DESCRIPTION]}
          onChange={this.onChangeField(EEditProjectFields.DESCRIPTION)}
        />
      );
    }

    return <div>{project.description}</div>;
  }

  renderProjectPhase(): ReactNode {
    const { isEditing, editInfo, project } = this.props;

    if (isEditing) {
      return (
        <Select native value={editInfo[EEditProjectFields.PHASE]} onChange={this.onChangePhase}>
          <option aria-label="None" value="" />
          <option value={EPhase.INITIAL}>{EPhase.INITIAL}</option>
          <option value={EPhase.PLANNING}>{EPhase.PLANNING}</option>
          <option value={EPhase.IMPLEMENTATION}>{EPhase.IMPLEMENTATION}</option>
          <option value={EPhase.CLOSING}>{EPhase.CLOSING}</option>
        </Select>
      );
    }

    return <div>{project.phase}</div>;
  }

  render(): ReactNode {
    const { project, isEditing, onEndEditing, onSaveEditing, onStartEditing } = this.props;

    return (
      <div className="b-project-info">
        <div className="project-info-wrapper">
          <div className="project-info">
            <label className="project-info-title">{PROJECT_NAME}</label>
            {this.renderProjectName()}
          </div>

          <div className="project-info">
            <label className="project-info-title">{DESCRIPTION}</label>
            {this.renderProjectDescription()}
          </div>

          <div className="project-info">
            <label className="project-info-title">{PHASE}</label>
            {this.renderProjectPhase()}
          </div>
        </div>

        <div className="project-info-wrapper">
          <div className="project-info">
            <label className="project-info-title">{CREATION_DATE}</label>
            <div>{new Date(project.createdAt).toLocaleString()}</div>
          </div>

          <div className="project-info">
            <label className="project-info-title">{LAST_UPDATE}</label>
            <div>{new Date(project.updatedAt!).toLocaleString()}</div>
          </div>
        </div>

        <EditButtons
          onEnd={onEndEditing}
          isEditing={isEditing}
          onSave={onSaveEditing}
          onStart={onStartEditing}
        />
      </div>
    );
  }
}

export default ProjectInfo;
