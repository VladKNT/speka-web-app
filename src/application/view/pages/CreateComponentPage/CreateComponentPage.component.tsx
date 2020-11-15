import React, { Component, ReactNode } from "react";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { IRootReducer } from "../../../data/root.reducer";
import { IIdRouteParam } from "../../../../resources/types/common.type";
import { CreateComponentForm } from "../../components/CreateComponentForm";
import { COMPONENT_CREATION } from "../../../../resources/constants/strings";
import { createComponentRoutine } from "../../../data/component/component.routine";
import { ICreateComponentTriggerPayload } from "../../../../resources/types/component.type";

import {
  ECreateComponentDetailsFields,
  ECreateComponentFields,
} from "../../../../resources/types/fields/createComponentField";

export interface ICreateComponentPageOwnProps {
  loading: number;
  onCreateComponent: (payload: ICreateComponentTriggerPayload) => void;
}

export interface ICreateComponentPageInjectedProps extends RouteComponentProps<IIdRouteParam> {}
export interface ICreateComponentPageProps extends ICreateComponentPageOwnProps, ICreateComponentPageInjectedProps {}

interface IState {
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
}

class CreateComponentPage extends Component<ICreateComponentPageProps, IState> {
  constructor(props: ICreateComponentPageProps) {
    super(props);

    this.state = {
      componentInfo: {
        [ECreateComponentFields.NAME]: "",
        [ECreateComponentFields.DESCRIPTION]: "",
        [ECreateComponentFields.ESTIMATED_TIME]: "",
      },

      componentDetailsInfo: {
        [ECreateComponentDetailsFields.NOTES]: "",
        [ECreateComponentDetailsFields.FEATURES]: "",
        [ECreateComponentDetailsFields.REQUIREMENTS]: "",
        [ECreateComponentDetailsFields.FUTURE_FEATURES]: "",
      },
    }
  }

  onChangeComponentInfo = (field: ECreateComponentFields, value: string | number): void => {
    this.setState((prevState) => ({
      componentInfo: {
        ...prevState.componentInfo,
        [field]: value,
      }
    }));
  };

  onChangeComponentDetailsInfo = (field: ECreateComponentDetailsFields, value: string): void => {
    this.setState((prevState) => ({
      componentDetailsInfo: {
        ...prevState.componentDetailsInfo,
        [field]: value,
      }
    }));
  };

  goToProject = (id: string) => (): void => {
    const { history } = this.props;
    history.push(`project/${id}`);
  }

  onSave = (): void => {
    const { match, onCreateComponent } = this.props;
    const { componentInfo, componentDetailsInfo } = this.state;

    const { id: projectId } = match.params;
    const createComponentDto: ICreateComponentTriggerPayload = {
      projectId,
      ...componentInfo,
      details: componentDetailsInfo,
      callback: this.goToProject(projectId),
      estimatedTime: parseInt(componentInfo[ECreateComponentFields.ESTIMATED_TIME], 10),
    }

    onCreateComponent(createComponentDto);
  };

  render(): ReactNode {
    const { componentInfo, componentDetailsInfo } = this.state;

    return (
      <div className="b-create-component-page">
        <h1 className="title">{COMPONENT_CREATION}</h1>

        <CreateComponentForm
          onSave={this.onSave}
          componentInfo={componentInfo}
          componentDetailsInfo={componentDetailsInfo}
          onChangeComponentInfo={this.onChangeComponentInfo}
          onChangeComponentDetailsInfo={this.onChangeComponentDetailsInfo}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { loading } = state.componentReducer;
  return { loading };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onCreateComponent: (payload: ICreateComponentTriggerPayload) => dispatch(createComponentRoutine(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateComponentPage);
