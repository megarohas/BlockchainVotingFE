import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import ReduxThunk from "redux-thunk";
import Wrapper from "./components/wrapper/wrapper.js";
import { Provider } from "react-redux";
import { newStore } from "./stores/store";

const App = () => {
  const store = newStore();
  return (
    <Provider store={store}>
      <Wrapper />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(function() {});
}
