import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { newStore } from "./stores/store";
import Wrapper from "./components/wrapper/wrapper.js";
import HelloForm from "./components/hello_form/hello_form.js";
import Dashboard from "./components/dashboard/dashboard.js";

const App = () => {
  const store = newStore();
  return (
    <Provider store={store}>
      <Wrapper>
        <HelloForm />
        <Dashboard />
      </Wrapper>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(function() {});
}
