import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./assets/pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="*" element={}></Route>
          <Route path="*" element={}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
