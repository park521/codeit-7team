import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Feed from "./pages/Feed/Feed";
import QuestionList from "./pages/QuestionList/QuestionList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="list" element={<QuestionList />} />
          <Route path="post/:subjectId" element={<Feed />} />
          <Route path="post/:subjectId/answer" element={<Feed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
