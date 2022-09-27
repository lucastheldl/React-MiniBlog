import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContex";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useFetchDoc } from "../../hooks/useFetchDoc";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDoc("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      const textTag = post.tagsArray.join(",");
      setTags(textTag);
    }
  }, [post]);

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //validate Image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError("URL inválida!");
    }

    //create Tag array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //check all values
    if (!title || !image || !body || !tags) {
      setFormError("Por favor, preencha todos os campos!");
    }

    if (formError) {
      return;
    }

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    //redirect to home page
    navigate("/");
  };

  return (
    <div className={styles.EditPost_container}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar.</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                name="title"
                required
                placeholder="Pense em um bom título..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>

            <label>
              <span>URL da imagen:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insira uma imagem legal"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img
              src={post.image}
              className={styles.image_preview}
              alt="Preview da imagem"
            />

            <label>
              <span>Conteúdo:</span>
              <textarea
                type="text"
                name="body"
                required
                placeholder="Descreva seu post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </label>

            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>

            {!response.loading && <button className="btn">Postar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
