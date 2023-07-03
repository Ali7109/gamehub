import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import VerticalNavbar from "./components/VerticalNavbar";

function App() {
	return (
		<div className="App">
			<VerticalNavbar />
			<div className="ml-10 pl-10">
				<Routes>
					<Route path="/" element={<Dashboard />} />
					{/* <Route path="services" element={ <Services/> } /> */}
					{/* <Route path="contact" element={ <Contact/> } /> */}
				</Routes>
			</div>
		</div>
	);
}

export default App;
