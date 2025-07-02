import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/Notestate";

function App() {
  return (
    <NoteState>
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          {/* Default route or fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
    </NoteState>
  );
}

export default App;
