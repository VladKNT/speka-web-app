import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore, Store }  from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { rootSaga} from "./root.saga";
import { rootReducer} from "./root.reducer";

const sagaMiddleware = createSagaMiddleware();

export const configureStore = (): Store => {
  const middleware = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middleware)];

  const store = createStore(rootReducer, composeWithDevTools(...enhancers));
  sagaMiddleware.run(rootSaga);

  return store;
};
