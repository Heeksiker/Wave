import React, { useState } from 'react';
import './Inicio.css';
import publi from '../img/img1.jpg'; 
import publicacion from '../img/Red Hot Chili Peppers.jpg'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShare, faPlus } from '@fortawesome/free-solid-svg-icons';

const Inicio = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'JohnDoe123',
      imageUrl: publicacion,
      description: '¡Hola a todos! Bienvenidos a mi nueva publicación.',
      likes: 15,
      comments: [
        { id: 1, user: 'JaneDoe456', text: '¡Qué buena publicación!' },
        { id: 2, user: 'MikeJohnson789', text: 'Me encanta tu foto!' }
      ],
      showComments: false
    },
  ]);

  const [newPost, setNewPost] = useState({
    description: '',
    imageUrl: ''
  });

  const [newCommentText, setNewCommentText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPost({ ...newPost, imageUrl: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPostData = {
      id: posts.length + 1,
      user: 'CurrentUser', // Cambia esto según el usuario actual
      imageUrl: newPost.imageUrl,
      description: newPost.description,
      likes: 0,
      comments: [],
      showComments: false
    };
    setPosts([...posts, newPostData]);
    setNewPost({ description: '', imageUrl: '' });
    setShowForm(false); // Ocultar el formulario después de enviar
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const toggleComments = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, showComments: !post.showComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleComment = (postId, commentText) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newComment = { id: post.comments.length + 1, user: 'Usuario', text: commentText };
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    });
    setPosts(updatedPosts);
    setNewCommentText('');
  };

  const handleShare = (postId) => {
    // Lógica para compartir la publicación
  };

  const profiles = [
    { id: 1, user: 'Vitali', imageUrl: publi },
    { id: 2, user: 'Andru', imageUrl: publi },
    { id: 3, user: 'Israel', imageUrl: publi },
    { id: 4, user: 'Josue', imageUrl: publi },
    { id: 5, user: 'Daniel', imageUrl: publi },
    { id: 6, user: 'Juan', imageUrl: publi },
    { id: 7, user: 'Luis', imageUrl: publi },
  ];

  const handleStoryClick = (imageUrl) => {
    setSelectedStory(imageUrl);
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  return (
    <div className="inicio-container">
      <div className="background-image"></div>
      <div className="sidebar"></div>
      <div className="container mt-4">
        <div className="profile-list">
          <button className="add-story-button" onClick={() => setShowForm(!showForm)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          {profiles.map(profile => (
            <div key={profile.id} className="profile-item" onClick={() => handleStoryClick(profile.imageUrl)}>
              <img src={profile.imageUrl} alt={profile.user} className="profile-image" />
              <p>{profile.user}</p>
            </div>
          ))}
        </div>
        {showForm && (
          <div className="add-post-form">
            <form onSubmit={handleSubmit}>
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
                onChange={handleImageChange}
                required
              />
              <button type="submit">Agregar Publicación</button>
            </form>
          </div>
        )}
        <div className="posts-list">
          {posts.map(post => (
            <div key={post.id} className="post-item">
              <h3>{post.user}</h3>
              <img src={post.imageUrl} alt="Publicación" className="post-image" />
              <p>{post.description}</p>
              <div className="post-buttons">
                <div className="button" onClick={() => handleLike(post.id)}>
                  <FontAwesomeIcon icon={faHeart} />
                  <span>{post.likes}</span>
                </div>
                <div className="button" onClick={() => toggleComments(post.id)}>
                  <FontAwesomeIcon icon={faComment} />
                  <span>{post.comments.length}</span>
                </div>
                <div className="button" onClick={() => handleShare(post.id)}>
                  <FontAwesomeIcon icon={faShare} />
                </div>
              </div>
              {post.showComments && (
                <div>
                  {post.comments.map(comment => (
                    <p key={comment.id}><strong>{comment.user}:</strong> {comment.text}</p>
                  ))}
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Añadir un comentario"
                  />
                  <button onClick={() => handleComment(post.id, newCommentText)}>Comentar</button>
                </div>
              )}
            </div>
          ))}
        </div>
        {selectedStory && (
          <div className="story-modal" onClick={closeStory}>
            <img src={selectedStory} alt="Story" className="story-image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Inicio;