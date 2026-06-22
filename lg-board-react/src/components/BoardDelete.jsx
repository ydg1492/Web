import { useParams } from "react-router-dom";
import useBoardDelete from "../hooks/useBoardDelete";

export default function BoardDelete() {
  const { no } = useParams();

  const {
    loading,
    handleDelete,
    handleCancel,
  } = useBoardDelete(no);

  return (
    <div className="delete-card">
      <h2>게시글 삭제</h2>

      <p>정말 삭제하시겠습니까?</p>

      <div className="button-group">
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "삭제중..." : "삭제"}
        </button>

        <button
          type="button"
          onClick={handleCancel}
          disabled={loading}
        >
          취소
        </button>
      </div>
    </div>
  );
}