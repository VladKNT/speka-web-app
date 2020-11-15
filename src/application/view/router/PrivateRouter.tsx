import React, { FC, useCallback, useEffect } from "react";

// @ts-ignore
import { cookies } from "brownies";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "../components/UI/Header";
import { ProjectPage } from "../pages/ProjectPage";
import { DashboardPage } from "../pages/DasboardPage";
import { IRootReducer } from "../../data/root.reducer";
import { signOutRoutine } from "../../data/auth/auth.routine";
import { CreateComponentPage } from "../pages/CreateComponentPage";
import { getCurrentUserRoutine } from "../../data/user/user.routine";
import { ContentWrapper } from "../components/UI/Containers/ContentWrapper";

export const PrivateRouter: FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: IRootReducer) => state.userReducer);

  useEffect(() => {
    dispatch(getCurrentUserRoutine.trigger());
  }, [dispatch]);

  const onSignOut = useCallback(() => {
    delete cookies.accessToken;
    delete cookies.refreshToken;
    dispatch(signOutRoutine.trigger());
  }, [dispatch]);

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Header currentUser={currentUser} onSignOut={onSignOut} />

      <ContentWrapper>
        <Route exact path="/" component={DashboardPage} />
        <Route exact path="/project/:id" component={ProjectPage} />
        <Route exact path="/project/:id/create-component" component={CreateComponentPage} />

        <Redirect to="/" />
      </ContentWrapper>
    </>
  );
}
