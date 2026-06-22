import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";
import BoardDetailPage from "./pages/BoardDetailPage";
import JoinPage from "./pages/JoinPage";
import LoginPage from "./pages/LoginPage";
import WritePage from "./pages/WritePage";
import ModifyPage from "./pages/ModifyPage";
import DeletePage from "./pages/DeletePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/board/:no" element={<BoardDetailPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/board/write" element={<WritePage />} />
      <Route path="/board/:no/edit" element={<ModifyPage />} />
      <Route path="/board/:no/delete" element={<DeletePage />} />
    </Routes>
  );
}

export default App;

