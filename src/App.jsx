import PendingTask from "./pages/PendingTask";
import TodayPending from "./pages/TodayPending";
import CompletedTask from "./pages/CompletedTask";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PendingTask" element={<PendingTask />} />
            <Route path="/TodayPending" element={<TodayPending />} />
            <Route path="/CompletedTask" element={<CompletedTask />} />
          </Routes>
        </Provider>
      </Router>
    </>
  );
}

export default App;
