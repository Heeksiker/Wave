import React, { useState } from 'react';
import './Perfil.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';

const Perfil = () => {
  const [user, setUser] = useState({
    username: 'JohnDoe123',
    personalInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    followers: 120,
    following: 180,
    posts: 10,
    profileImage: ''
  });

  const [newPost, setNewPost] = useState({
    description: '',
    imageUrl: ''
  });

  const [newStory, setNewStory] = useState({
    title: '',
    imageUrl: ''
  });

  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setNewStory({ ...newStory, [name]: value });
    } else {
      setNewPost({ ...newPost, [name]: value });
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'post') {
        setNewPost({ ...newPost, imageUrl: reader.result });
      } else if (type === 'story') {
        setNewStory({ ...newStory, imageUrl: reader.result });
      } else if (type === 'profile') {
        setUser({ ...user, profileImage: reader.result });
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    const newPostData = {
      id: posts.length + 1,
      user: user.username,
      imageUrl: newPost.imageUrl,
      description: newPost.description,
      likes: 0,
      comments: [],
      showComments: false
    };
    setPosts([...posts, newPostData]);
    setNewPost({ description: '', imageUrl: '' });
    alert('Publicación creada con éxito');
  };

  const handleSubmitStory = (e) => {
    e.preventDefault();
    const newStoryData = {
      id: stories.length + 1,
      user: user.username,
      title: newStory.title,
      imageUrl: newStory.imageUrl
    };
    setStories([...stories, newStoryData]);
    setNewStory({ title: '', imageUrl: '' });
    alert('Historia destacada subida con éxito');
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    setPosts(posts.map(post => post.id === postId ? { ...post, comments: [...post.comments, comment] } : post));
    setComment('');
  };

  const handleShare = (postId) => {
    alert(`Compartir publicación con ID: ${postId}`);
  };

  const toggleComments = (postId) => {
    setShowComments({ ...showComments, [postId]: !showComments[postId] });
  };

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <div className="perfil-image-container">
          {user.profileImage ? (
            <img src={user.profileImage} alt="Perfil" className="perfil-image" />
          ) : (
            <div className="perfil-image-placeholder">Sin Foto</div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'profile')}
            className="perfil-image-input"
          />
        </div>
        <h2>{user.username}</h2>
        <p>{user.personalInfo}</p>
        <div className="perfil-stats">
          <span>Publicaciones: {user.posts}</span>
          <span>Seguidores: {user.followers}</span>
          <span>Seguidos: {user.following}</span>
        </div>
      </div>
      <div className="perfil-actions">
        <button onClick={() => setShowPostForm(!showPostForm)}>
          {showPostForm ? 'Cancelar' : 'Crear Publicación'}
        </button>
        <button onClick={() => setShowStoryForm(!showStoryForm)}>
          {showStoryForm ? 'Cancelar' : 'Subir Historia Destacada'}
        </button>
      </div>
      {showPostForm && (
        <div className="perfil-add-post-form">
          <h3>Crear Publicación</h3>
          <form onSubmit={handleSubmitPost}>
            <input
              type="text"
              name="description"
              value={newPost.description}
              onChange={handleInputChange}
              placeholder="Descripción"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'post')}
              required
            />
            <button type="submit">Agregar Publicación</button>
          </form>
        </div>
      )}
      {showStoryForm && (
        <div className="perfil-add-story-form">
          <h3>Subir Historia Destacada</h3>
          <form onSubmit={handleSubmitStory}>
            <input
              type="text"
              name="title"
              value={newStory.title}
              onChange={handleInputChange}
              placeholder="Título"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'story')}
              required
            />
            <button type="submit">Subir Historia</button>
          </form>
        </div>
      )}
      <div className="perfil-posts">
        <h3>Publicaciones</h3>
        <div className="perfil-posts-list">
          {posts.map(post => (
            <div key={post.id} className="perfil-post-item">
              <h4>{post.user}</h4>
              <img src={post.imageUrl} alt="Publicación" className="perfil-post-image" />
              <div className="perfil-post-actions">
                <button onClick={() => handleLike(post.id)}>
                  <FontAwesomeIcon icon={faThumbsUp} /> ({post.likes})
                </button>
                <button onClick={() => toggleComments(post.id)}>
                  <FontAwesomeIcon icon={faComment} />
                </button>
                <button onClick={() => handleShare(post.id)}>
                  <FontAwesomeIcon icon={faShare} />
                </button>
              </div>
              <p>{post.description}</p>
              <div className={`perfil-post-comments ${showComments[post.id] ? 'show' : ''}`}>
                <form onSubmit={(e) => handleCommentSubmit(e, post.id)}>
                  <input
                    type="text"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Escribe un comentario"
                    required
                  />
                  <button type="submit">Comentar</button>
                </form>
                {post.comments.map((comment, index) => (
                  <p key={index}>{comment}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="perfil-stories">
        <h3>Historias Destacadas</h3>
        <div className="perfil-stories-list">
          {stories.map(story => (
            <div key={story.id} className="perfil-story-item">
              <img src={story.imageUrl} alt="Historia" className="perfil-story-image" />
              <h4 className="perfil-story-title">{story.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Perfil;