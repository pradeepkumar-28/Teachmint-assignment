import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./style/index.scss";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import UserInfo from "./UserInfo";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <UserInfo />
    </Provider>
  </BrowserRouter>
);
