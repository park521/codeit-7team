import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import ButtonTest from "./components/Commons/Buttons/ButtonTest";
import IndividualFeed from "./pages/IndividualFeed/IndividualFeed";
import QuestionListPage from "./pages/QuestionListPage/QuestionListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Homepage />} />
          <Route path="list" element={<QuestionListPage />} />
          <Route path="post/:subjectId" element={<IndividualFeed />} />
          <Route path="answer" element={<IndividualFeed />} />
        </Route>
        {/* test용 페이지라서 따로 빼뒀습니다 */}
        <Route path="/buttontest" element={<ButtonTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
