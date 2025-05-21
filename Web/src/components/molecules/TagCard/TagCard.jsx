import { Link } from "react-router";
import "../../../styles/Tags.css";

export default function TagCard({ tag }) {
  return (
    <Link to={`/tag/${tag.id}?tagName=${tag.name}`} className="tag">
      <div className="tag-black-cover"></div>
      <img src={tag.image.src} alt={tag.name} className="tag-image" />
      <span className="tag-title">{tag.name}</span>
    </Link>
  );
}
