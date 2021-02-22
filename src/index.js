import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";

// CSS
import "assets/styles/tailwind.css";

// Views
import Tables from "views/Tables.js";

/**
 * Utilities
 */
Object.filter = (obj, predicate) =>
	Object.fromEntries(Object.entries(obj).filter(predicate));

ReactDOM.render(
	<Provider store={store}>
		<div className="relative">
			<div className="relative bg-blue-600 py-20" />
			<div className="container mx-auto relative">
				<div className="px-4 md:px-10 mx-auto w-full -m-24">
					<Tables />
				</div>
			</div>
		</div>
	</Provider>,
	document.getElementById("root")
);

registerServiceWorker();
