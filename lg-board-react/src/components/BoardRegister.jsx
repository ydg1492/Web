import useBoardRegister from "../hooks/useBoardRegister";

const BoardRegister = () => {
  const {
    title,
    setTitle,
    message,
    setMessage,
    loading,
    handleSubmit,
    handleCancel,
  } = useBoardRegister();

  return (
    <div className="write-card">
      <h2>게시글 등록</h2>

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
            {loading ? "등록중..." : "등록"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
          >
            초기화
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardRegister;