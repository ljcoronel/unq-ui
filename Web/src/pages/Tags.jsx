import { useEffect, useState } from "react";
import { fetchTags } from "../services/tags";
import TagCard from "../components/molecules/TagCard";
import "../styles/Tags.css";

export default function Tags() {
  const [tags, setTags] = useState([]);

  const getTags = async () => {
    try {
      const data = await fetchTags();
      console.log("Tags data:", data);
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <section className="tags-container">
      <h2>BROWSE BY CATEGORY</h2>
      <div className="tags-list">
        {tags.map((tag) => (
          <TagCard key={tag.id} tag={tag} />
        ))}
      </div>
    </section>
  );
}
