import Header from "../components/Header";
import TeamCard from "../components/TeamCard";
import BoardList from "../components/BoardList";
import SearchBar from "../components/SearchBar";
import Paging from "../components/Paging";

import useBoard from "../hooks/useBoard";
import useAuth from "../hooks/useAuth";
import useBoardActions from "../hooks/useBoardActions";

function BoardPage() {
  const {
    list,
    page,
    totalPages,
    searchType,
    setSearchType,
    keyword,
    setKeyword,
    loadBoard,
    open,
    selectedPost,
    openModal,
    closeModal,
  } = useBoard();

  const { loginUser, setLoginUser } = useAuth();
  const { goWrite, goModify , goDelete } = useBoardActions();

  // 작성자 체크
  const isOwner =
    loginUser &&
    selectedPost &&
    (loginUser?.user_id || loginUser) === selectedPost?.user_id;

  return (
    <>
      <Header loginUser={loginUser} setLoginUser={setLoginUser} />

      <TeamCard />

      <main>
        <SearchBar
          searchType={searchType}
          setSearchType={setSearchType}
          keyword={keyword}
          setKeyword={setKeyword}
          loadBoard={loadBoard}
        />

        {loginUser && (
          <div className="write-area">
            <button
              className="show"
              onClick={() => goWrite(loginUser)}
            >  
              글쓰기
            </button>
          </div>
        )}

        <BoardList list={list} openModal={openModal} />

        <Paging
          page={page}
          totalPages={totalPages}
          searchType={searchType}
          keyword={keyword}
          loadBoard={loadBoard}
        />
      </main>

      {open && selectedPost && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>게시글 번호: {selectedPost.no}</p>
            <h2>{selectedPost.title}</h2>
            <p>작성자: {selectedPost.user_id}</p>
            <p>{selectedPost.message}</p>

            {isOwner && (
              <div className="modal-action">
                <button onClick={() => goModify(selectedPost.no)}>
                  수정
                </button>
                <button onClick={() => goDelete(selectedPost.no)}>
                  삭제
                </button>
              </div>
            )}

            <button className="close-btn" onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
}

export default BoardPage;