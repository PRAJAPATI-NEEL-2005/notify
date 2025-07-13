import "./App.css";
import { useState } from "react";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/Notestate";
import Authstate from "./context/authentication/Authstate";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null);
  
  const showAlert = (msg, type) => {
    setAlert({
      message: msg,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <Authstate>
      <NoteState>
        <div className="App">
          <Router>
            <Navbar showalert={showAlert} />
            <Alert alert={alert}></Alert>
            <div className="main-content">
              <div className="container">
                <Routes>
                  <Route path="/about" element={<About showalert={showAlert} />} />
                  <Route path="/home" element={<Home showalert={showAlert} />} />
                  <Route path="/login" element={<Login showalert={showAlert} />} />
                  <Route path="/signup" element={<Signup showalert={showAlert} />} />
                  {/* Default route or fallback */}
                  <Route path="*" element={<Home showalert={showAlert} />} />
                </Routes>
              </div>
            </div>
          </Router>
        </div>
      </NoteState>
    </Authstate>
  );
}

export default App;
