import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import ButtonTest from "./components/Commons/Buttons/ButtonTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* 버튼 테스트 페이지 */}
        <Route path="/buttonTest" element={<ButtonTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
