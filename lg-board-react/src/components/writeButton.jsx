export default function WriteButton({ loginUser }) {
  if (!loginUser) return null;

  return (
    <div className="write-area">
      <button className="show">
        글쓰기
      </button>
    </div>
  );
}