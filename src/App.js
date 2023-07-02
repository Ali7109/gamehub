import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Dashboard />} />
				{/* <Route path="services" element={ <Services/> } /> */}
				{/* <Route path="contact" element={ <Contact/> } /> */}
			</Routes>
		</div>
	);
}

export default App;
