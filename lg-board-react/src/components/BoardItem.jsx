export default function BoardItem({ item, openModal }) {
  return (
    <article
      className="card"
      onClick={() => openModal(item)}
    >
      <div className="card-content">

        <h3>{item.title}</h3>

        <div className="writer">
          작성자 : {item.user_id}
        </div>

        <div className="message">
          {item.message}
        </div>

        <div className="date">
          {item.regdate}
        </div>

      </div>
    </article>
  );
}