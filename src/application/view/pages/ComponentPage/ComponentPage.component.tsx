import React, { Component, ReactNode } from "react";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { IRootReducer } from "../../../data/root.reducer";
import { getComponentRoutine } from "../../../data/component/component.routine";
import { IComponent, IComponentDetails, IGetComponentTriggerPayload } from "../../../../resources/types/component.type";
import { IIdRouteParam } from "../../../../resources/types/common.type";

export interface IComponentPageOwnProps {
  loading: number;
  component: IComponent | null;
  componentDetails: IComponentDetails | null;
  comparisonComponentDetails: IComponentDetails | null;
  onGetComponent: (payload: IGetComponentTriggerPayload) => void;
}

export interface IComponentPageInjectedProps extends RouteComponentProps<IIdRouteParam> {}
export interface IComponentPageProps extends IComponentPageOwnProps, IComponentPageInjectedProps {}

class ComponentPage extends Component<IComponentPageProps> {
  componentDidMount(): void {
    const { match, onGetComponent } = this.props;

    const { id } = match.params;
    onGetComponent({ id });
  }

  render(): ReactNode {
    return (
      <div className="b-component-page">
        Component
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentPage);
