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
  clearComponentWithDetails,
  createComponentDetailsRoutine,
  clearComparisonComponentDetails,
  getComponentDetailsByVersionRoutine,
} from "../../../data/component/component.routine";

import {
  IComponent,
  IComponentDetails,
  IEditComponentDto,
  IGetComponentTriggerPayload,
  IEditComponentTriggerPayload,
  ICreateComponentDetailsTriggerPayload,
  IGetComponentDetailsByVersionTriggerPayload,
} from "../../../../resources/types/component.type";

import {
  EEditComponentFields,
  IEditComponentFields,
  IEditComponentDetailsFields,
  EEditComponentDetailsFields,
} from "../../../../resources/types/fields/editComponentFields";

import "./ComponentPage.style.scss";

export interface IComponentPageOwnProps {
  loading: number;
  component: IComponent | null;
  componentDetails: IComponentDetails | null;
  comparisonComponentDetails: IComponentDetails | null;

  onClearComponentWithDetails: () => void;
  onClearComparisonComponentDetails: () => void;
  onGetComponent: (payload: IGetComponentTriggerPayload) => void;
  onEditComponent: (payload: IEditComponentTriggerPayload) =>  void;
  onCreateComponentDetails: (payload: ICreateComponentDetailsTriggerPayload) => void;
  onGetComponentDetailsByVersion: (payload: IGetComponentDetailsByVersionTriggerPayload) => void;
}

export interface IComponentPageInjectedProps extends RouteComponentProps<IIdRouteParam> {}
export interface IComponentPageProps extends IComponentPageOwnProps, IComponentPageInjectedProps {}

interface IState {
  compareVersion: number;
  editComponent: boolean;
  editComponentDetails: boolean;
  componentEditing: IEditComponentFields;
  componentDetailsEditing: IEditComponentDetailsFields;
}

class ComponentPage extends Component<IComponentPageProps, IState> {
  constructor(props: IComponentPageProps) {
    super(props);

    this.state = {
      compareVersion: 0,
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

  componentWillUnmount(): void {
    const { onClearComponentWithDetails } = this.props;
    onClearComponentWithDetails();
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

  onChangeCompareVersion = (version: number): void => {
    const { match, onClearComparisonComponentDetails, onGetComponentDetailsByVersion } = this.props;
    const { id } = match.params;

    this.setState({ compareVersion: version });

    console.info({ version });
    if (version) {
      onGetComponentDetailsByVersion({ id, version });
    } else {
      onClearComparisonComponentDetails();
    }
  }

  render(): ReactNode {
    const { component, componentDetails, comparisonComponentDetails } = this.props;

    const {
      editComponent,
      compareVersion,
      componentEditing,
      editComponentDetails,
      componentDetailsEditing,
    } = this.state;

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
          compareVersion={compareVersion}
          isEditing={editComponentDetails}
          componentDetails={componentDetails}
          onSaveEditing={this.onSaveComponentDetailsInfo}
          onChange={this.onChangeComponentDetailsEditing}
          onEndEditing={this.onEndComponentDetailsEditing}
          componentDetailsEditing={componentDetailsEditing}
          onChangeCompareVersion={this.onChangeCompareVersion}
          onStartEditing={this.onStartComponentDetailsEditing}
          comparisonComponentDetails={comparisonComponentDetails}
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
    onClearComponentWithDetails: () => dispatch(clearComponentWithDetails()),
    onClearComparisonComponentDetails: () => dispatch(clearComparisonComponentDetails()),
    onGetComponent: (payload: IGetComponentTriggerPayload) => dispatch(getComponentRoutine.trigger(payload)),
    onEditComponent: (payload: IEditComponentTriggerPayload) => dispatch(editComponentRoutine.trigger(payload)),
    onCreateComponentDetails: (payload: ICreateComponentDetailsTriggerPayload) => dispatch(createComponentDetailsRoutine.trigger(payload)),
    onGetComponentDetailsByVersion: (payload: IGetComponentDetailsByVersionTriggerPayload) => dispatch(getComponentDetailsByVersionRoutine.trigger(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentPage);
