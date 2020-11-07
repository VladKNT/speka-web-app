import React, { Component, ReactNode } from "react";

export interface IDashboardPageOwnProps {}
export interface IDashboardPageInjectedProps {}
export interface IDashboardPageProps extends IDashboardPageOwnProps, IDashboardPageInjectedProps {}

class DashboardPage extends Component<IDashboardPageProps> {
  render(): ReactNode {
    return (
      <div>
        Dashboard
      </div>
    );
  }
}

export default DashboardPage;
