export default function SearchBar({
  searchType,
  setSearchType,
  keyword,
  setKeyword,
  loadBoard
}) {

  const search = () => {
    loadBoard(1, searchType, keyword.trim());
  };

  return (
    <section className="search-section">

      <div className="search-area">

        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="">전체</option>
          <option value="title">제목</option>
          <option value="content">내용</option>
        </select>

        <input
          type="text"
          value={keyword}
          placeholder="검색어 입력"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
        />

        <button onClick={search}>
          검색
        </button>

      </div>

    </section>
  );
}