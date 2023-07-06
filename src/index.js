import React from "react";
import ReactDOM from "react-dom/client";
import "./frontend-view/index.css";
import App from "./App";
import rootReducer from "./StateManagement/reducers";
import { legacy_createStore as createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(rootReducer);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
