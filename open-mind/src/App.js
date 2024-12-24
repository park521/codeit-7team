import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import IndividualFeed from "./pages/IndividualFeed/IndividualFeed";
import QuestionListPage from "./pages/QuestionList/QuestionListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Homepage />} />
          <Route path="list" element={<QuestionListPage />} />
          <Route path="post/:subjectId" element={<IndividualFeed />} />
          <Route path="post/:subjectId/answer" element={<IndividualFeed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
