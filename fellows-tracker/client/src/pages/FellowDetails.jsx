/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import fetchData from '../utils/fetchData';

const FellowDetails = () => {
  // fetched state
  const [fellow, setFellow] = useState({});
  const [postsByFellow, setPostsByFellow] = useState([])

  // form response state
  const [deletedPost, setDeletedPost] = useState('');
  const [newPost, setNewPost] = useState('');

  // form input state
  const [newFellowName, setNewFellowName] = useState('');
  const [postContent, setPostContent] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const doFetch = async () => {
      try {
        const [data, error] = await fetchData(`/api/fellows/${id}`)
        if (data) setFellow(data);

        const [posts, _] = await fetchData(`/api/fellows/${id}/posts`)
        if (posts) setPostsByFellow(posts);
      } catch (error) {
        console.log(error);
      }
    }
    doFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedPost, newPost]);

  const changeFellowName = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ fellowName: newFellowName })
      }
      const [data, error] = await fetchData(`/api/fellows/${id}`, options)
      if (data) setFellow(data)
    } catch (error) {
      console.log(error);
    }
    setNewFellowName('')
  }

  const submitPost = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ postContent, fellowId: id })
      }
      const [newPostResponse, _] = await fetchData(`/api/posts`, options)
      if (newPostResponse) setNewPost(newPostResponse);
    } catch (error) {
      console.log(error);
    }
    setPostContent('');
  }

  const deletePost = async (postId) => {
    try {
      const options = {
        method: "DELETE"
      }
      const [deletedPostResponse, _] = await fetchData(`/api/posts/${postId}`, options);
      if (deletedPostResponse) setDeletedPost(deletedPostResponse);

    } catch (error) {
      console.log(error);
    }
  }

  const deleteFellow = async () => {
    try {
      const options = {
        method: "DELETE"
      }
      await fetchData(`/api/fellows/${fellow.id}`, options);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Fellow Details</h1>
      <h2>Posts by {fellow.name}</h2>
      <ul>
        {
          postsByFellow.map((post) => {
            return (
              <li className='post-list-item' key={post.id}>
                <p>{post.post_content}</p>
                <button onClick={() => deletePost(post.id)}>X</button>
              </li>
            )
          })
        }
      </ul>

      <form onSubmit={submitPost}>
        <label htmlFor="postContent">New Post</label>
        <textarea name="postContent" id="postContent" value={postContent} onChange={(e) => setPostContent(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={changeFellowName}>
        <label htmlFor="name">Update Fellow Name</label>
        <input type="text" name="name" id="name" value={newFellowName} onChange={(e) => setNewFellowName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      <button style={{ backgroundColor: 'red' }} onClick={deleteFellow}>Delete Fellow</button>
      <br></br>
      <br></br>
      <Link to='/'>
        <button>Go Home</button>
      </Link>
    </>
  )
}

export default FellowDetails;