import { useNavigate } from "react-router-dom";
import BoardItem from "./BoardItem";

export default function BoardList({ list, openModal }) {
  return (
    <section className="board-area">
      {list.length === 0 ? (
        <div>검색 결과 없음</div>
      ) : (
        list.map((item) => (
          <BoardItem
            key={item.no}
            item={item}
            openModal={openModal}
          />
        ))
      )}
    </section>
  );
}