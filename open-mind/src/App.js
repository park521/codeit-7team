import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import ButtonTest from "./components/Commons/Buttons/ButtonTest";
import IndividualFeed from "./pages/IndividualFeed/IndividualFeed";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* 버튼 테스트 페이지 */}
        <Route path="/buttonTest" element={<ButtonTest />} />
        {/* 개별 피드 [todo : 이후에 id 속성 적용] */}
        <Route path="/post" element={<IndividualFeed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
