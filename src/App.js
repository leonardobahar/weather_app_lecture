import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Views/Home/View";
import Detail from "./Views/Detail/View";

const App =()=>{
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
