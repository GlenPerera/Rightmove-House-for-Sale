import Navbar from "./components/Navbar/navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";

import Footer from "./components/Footer/footer";

import "./App.css";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<about />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
