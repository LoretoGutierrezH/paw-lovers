import React from 'react';
import Post from '../../components/Post/Post.jsx';
import style from './Posts.module.css';

const Posts = (props) => {
  console.log('props en posts', props.match);
  return (
    <main className={style.postsContainer}>
      <Post />
    </main>
  );
}

export default Posts;