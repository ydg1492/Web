import { useParams } from "react-router-dom";
import useBoardModify from "../hooks/useBoardModify";

export default function BoardModify() {
  const { no } = useParams();

  const {
    title,
    setTitle,
    message,
    setMessage,
    loading,
    handleSubmit,
    handleCancel,
  } = useBoardModify(no);

  return (
    <div className="update-card">
      <h2>게시글 수정</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>제목</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목 입력"
          />
        </div>

        <div className="form-group">
          <label>내용</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="내용 입력"
          />
        </div>

        <div className="button-group">
          <button type="submit" disabled={loading}>
            {loading ? "수정중..." : "수정"}
          </button>

          <button type="button" onClick={handleCancel} disabled={loading}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}