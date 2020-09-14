import React from 'react';
import { Link } from 'react-router-dom';
import Post from '../../components/Post/Post.jsx';
import style from './Posts.module.css';

const Posts = (props) => {
  console.log('props en posts', props.match);
   let post = null;
   switch (props.match.params.category) {
     case "servicios":
       post = {
         id: "serv1",
         heading: "Título de servicio",
         category: "Categoría: servicio",
         content: "blablabla sobre servicio",
       };
       break;
     default:
       post = {
         id: "tip1",
         heading: "UN TIP",
         category: "TIPS",
         content:
           "Evita sacar a pasear a tu perro cuando haya mucho sol, ya que podría dañarse las almohadillas de las patitas. Si no hay otra alternativa, refresca sus patas con agua constantemente y evita el asfalto.",
       };
   }
  return (
    <main className={style.postsContainer}>
      <section className={style.newPostControl}>
        <button className={style.newPostBtn}>Nueva publicación</button>
      </section>
      <Post
        id={post.id}
        heading={post.heading}
        category={post.category}
        content={post.content}
      />
    </main>
  );
}

export default Posts;