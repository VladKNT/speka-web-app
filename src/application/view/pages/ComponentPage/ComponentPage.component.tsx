import React, { Component, ReactNode } from "react";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { IRootReducer } from "../../../data/root.reducer";
import { IIdRouteParam } from "../../../../resources/types/common.type";
import { ComponentInfo } from "../../components/ComponentComponents/ComponentInfo";
import { ComponentDetailsInfo } from "../../components/ComponentComponents/ComponentDetailsInfo";
import { initialEditComponent, initialEditComponentDetails } from "../../../../resources/constants/component";

import {
  getComponentRoutine,
  editComponentRoutine,
  createComponentDetailsRoutine,
} from "../../../data/component/component.routine";

import {
  IComponent,
  IComponentDetails,
  IEditComponentDto,
  IGetComponentTriggerPayload,
  IEditComponentTriggerPayload,
  ICreateComponentDetailsTriggerPayload,
} from "../../../../resources/types/component.type";

import {
  EEditComponentFields,
  IEditComponentFields,
  IEditComponentDetailsFields,
  EEditComponentDetailsFields,
} from "../../../../resources/types/fields/editComponentFields";

export interface IComponentPageOwnProps {
  loading: number;
  component: IComponent | null;
  componentDetails: IComponentDetails | null;
  comparisonComponentDetails: IComponentDetails | null;
  onGetComponent: (payload: IGetComponentTriggerPayload) => void;
  onEditComponent: (payload: IEditComponentTriggerPayload) =>  void;
  onCreateComponentDetails: (payload: ICreateComponentDetailsTriggerPayload) => void;
}

export interface IComponentPageInjectedProps extends RouteComponentProps<IIdRouteParam> {}
export interface IComponentPageProps extends IComponentPageOwnProps, IComponentPageInjectedProps {}

interface IState {
  editComponent: boolean;
  editComponentDetails: boolean;
  componentEditing: IEditComponentFields;
  componentDetailsEditing: IEditComponentDetailsFields;
}

class ComponentPage extends Component<IComponentPageProps, IState> {
  constructor(props: IComponentPageProps) {
    super(props);

    this.state = {
      editComponent: false,
      editComponentDetails: false,
      componentEditing: initialEditComponent,
      componentDetailsEditing: initialEditComponentDetails,
    }
  }

  componentDidMount(): void {
    const { match, onGetComponent } = this.props;

    const { id } = match.params;
    onGetComponent({ id });
  }

  onChangeComponentEditing = (field: EEditComponentFields, value: string): void => {
    this.setState((prevState) => ({
      componentEditing: {
        ...prevState.componentEditing,
        [field]: value,
      }
    }));
  };

  onChangeComponentDetailsEditing = (field: EEditComponentDetailsFields, value: string): void => {
    this.setState((prevState) => ({
      componentDetailsEditing: {
        ...prevState.componentDetailsEditing,
        [field]: value,
      }
    }));
  };

  // ======== Edit component logic ========

  onStartComponentEditing = (): void => {
    const { component } = this.props;

    if (component) {
      this.setState({
        editComponent: true,
        componentEditing: {
          [EEditComponentFields.NAME]: component.name,
          [EEditComponentFields.PHASE]: component.phase,
          [EEditComponentFields.DESCRIPTION]: component.description,
          [EEditComponentFields.SPENT_TIME]: component.spentTime.toString(10),
          [EEditComponentFields.ESTIMATED_TIME]: component.estimatedTime.toString(10),
        }
      });
    }
  }

  onEndComponentEditing = (): void => {
    this.setState({ editComponent: false, componentEditing: initialEditComponent });
  }

  onSaveComponentEditing = (): void => {
    const { componentEditing } = this.state;
    const { match, onEditComponent } = this.props;

    const { id } = match.params;
    const editComponentDto: IEditComponentDto = {
      id,
      ...componentEditing,
      spentTime: componentEditing[EEditComponentFields.SPENT_TIME]
        ? parseInt(componentEditing[EEditComponentFields.SPENT_TIME]!, 10)
        : undefined,

      estimatedTime: componentEditing[EEditComponentFields.ESTIMATED_TIME]
        ? parseInt(componentEditing[EEditComponentFields.ESTIMATED_TIME]!, 10)
        : undefined,
    }

    onEditComponent(editComponentDto);
    this.onEndComponentEditing();
  }

  // ======== Edit component details logic ========

  onStartComponentDetailsEditing = (): void => {
    const { componentDetails } = this.props;

    if (componentDetails) {
      this.setState({
        editComponentDetails: true,
        componentDetailsEditing: {
          [EEditComponentDetailsFields.NOTES]: componentDetails.notes,
          [EEditComponentDetailsFields.FEATURES]: componentDetails.features,
          [EEditComponentDetailsFields.REQUIREMENTS]: componentDetails.requirements,
          [EEditComponentDetailsFields.FUTURE_FEATURES]: componentDetails.futureFeatures,
        }
      });
    }
  }

  onEndComponentDetailsEditing = (): void => {
    this.setState({ editComponentDetails: false, componentDetailsEditing: initialEditComponentDetails });
  }

  onSaveComponentDetailsInfo = (): void => {
    const { componentDetailsEditing } = this.state;
    const { match, onCreateComponentDetails } = this.props;

    const { id } = match.params;

    onCreateComponentDetails({ id, ...componentDetailsEditing });
    this.onEndComponentDetailsEditing();
  }


  render(): ReactNode {
    const { component, componentDetails } = this.props;
    const { editComponent, editComponentDetails, componentEditing, componentDetailsEditing } = this.state;

    if (!component || !componentDetails) {
      return null;
    }

    return (
      <div className="b-component-page">
        <ComponentInfo
          component={component}
          isEditing={editComponent}
          componentEditing={componentEditing}
          onChange={this.onChangeComponentEditing}
          onEndEditing={this.onEndComponentEditing}
          onSaveEditing={this.onSaveComponentEditing}
          onStartEditing={this.onStartComponentEditing}
        />

        <ComponentDetailsInfo
          isEditing={editComponentDetails}
          componentDetails={componentDetails}
          onSaveEditing={this.onSaveComponentDetailsInfo}
          onChange={this.onChangeComponentDetailsEditing}
          onEndEditing={this.onEndComponentDetailsEditing}
          componentDetailsEditing={componentDetailsEditing}
          onStartEditing={this.onStartComponentDetailsEditing}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { loading, component, componentDetails, comparisonComponentDetails } = state.componentReducer;

  return {
    loading,
    component,
    componentDetails,
    comparisonComponentDetails,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onGetComponent: (payload: IGetComponentTriggerPayload) => dispatch(getComponentRoutine.trigger(payload)),
    onEditComponent: (payload: IEditComponentTriggerPayload) => dispatch(editComponentRoutine.trigger(payload)),
    onCreateComponentDetails: (payload: ICreateComponentDetailsTriggerPayload) => dispatch(createComponentDetailsRoutine.trigger(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentPage);
