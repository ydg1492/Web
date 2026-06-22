export default function Paging({
  page,
  totalPages,
  searchType,
  keyword,
  loadBoard
}) {

  return (
    <nav className="pagination">

      {page > 1 && (
        <button
          onClick={() =>
            loadBoard(page - 1, searchType, keyword)
          }
        >
          이전
        </button>
      )}

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={page === i + 1 ? "active" : ""}
          onClick={() =>
            loadBoard(i + 1, searchType, keyword)
          }
        >
          {i + 1}
        </button>
      ))}

      {page < totalPages && (
        <button
          onClick={() =>
            loadBoard(page + 1, searchType, keyword)
          }
        >
          다음
        </button>
      )}

    </nav>
  );
}