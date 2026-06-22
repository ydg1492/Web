import { useParams } from "react-router-dom";
import useBoardDetail from "../hooks/useBoardDetail";
import BoardDetail from "../components/BoardDetail";

export default function BoardDetailPage() {
  const { no } = useParams();

  const { post, goEdit } = useBoardDetail(no);

  return <BoardDetail post={post} goEdit={goEdit} />;
}