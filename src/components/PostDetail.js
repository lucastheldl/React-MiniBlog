import styles from "./PostDetail.module.css";

import { Link } from "react-router-dom";

const PostDetail = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      <div className={styles.img_container}>
        <img src={post.image} alt={post.title} />
      </div>

      <h2>{post.title}</h2>

      <p className={styles.createdBy}>{post.createdBy}</p>

      <div className={styles.tags}>
        {post.tagsArray.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/React-MiniBlog/posts/${post.id}`} className="btn btn-outline">
        Ler
      </Link>
    </div>
  );
};

export default PostDetail;
