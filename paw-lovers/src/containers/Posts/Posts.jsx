import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from '../../components/Post/Post.jsx';
import style from './Posts.module.css';
import firebase from '../../Firebase';

const db = firebase.firestore();
const auth = firebase.auth();

const Posts = (props) => {
  const [postsState, setPostsState] = useState([]);
  /* const formattingDate = (doc) => {
    const formattedDate = doc.data().timestamp.toDate().toString();
    const splitDate = formattedDate.split(" ");
    // console.log(splitDate[1], splitDate[2], splitDate[3], splitDate[4]);
    let month;
    if (splitDate[1].includes("Sep")) {
      // porque solo es para mostrar :D xd
      month = "Septiembre";
    }
    // console.log(`${splitDate[2]} de ${month} del ${splitDate[3]} a las ${splitDate[4]}`);
    return `${splitDate[2]} de ${month} del ${splitDate[3]} a las ${splitDate[4]}`;
  }; */
  // Lectura de posts y almacenamiento en estado
  let posts = [];

  useEffect(() => {
    if (props.match.params.category === 'inicio') {
      db.collection('Posts').onSnapshot((docs) => {
        docs.forEach(doc => {
          const postObject = {
            id: doc.id,
            author: doc.data().author,
            category: doc.data().category,
            comments: doc.data().comments,
            content: doc.data().content,
            likes: doc.data().likes,
            /* timestamp: formattingDate(doc), */
            title: doc.data().title,
          };
          posts.push(postObject);
        })
        setPostsState(posts); //tiene que estar aquí o posts = []
      })
      console.log("Después del primer render: UseEffect de Fetch solo para inicio");
    } else {
      db.collection("Posts")
        .where("category", "==", `${props.match.params.category}`)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            const postObject = {
              id: doc.id,
              author: doc.data().author,
              category: doc.data().category,
              comments: doc.data().comments,
              content: doc.data().content,
              likes: doc.data().likes,
              /* timestamp: formattingDate(doc), */
              title: doc.data().title,
            };
            posts.push(postObject);
          });
          setPostsState(posts);
        });
      console.log("Después del primer render: UseEffect de Fetch");
    }
    
  }, [props.match.params.category]);

  // Lógica provisoria de population de container Post
  useEffect(() => {
    console.log(postsState);
  }, [postsState])
  let postsArray = null;

  postsArray = postsState.map(post => {
    return (
      <Post
        key={post.id}
        category={post.category}
        author={post.author}
        title={post.title}
        content={post.content}
        likes={post.likes}
        comments={post.comments}
      />
    );
  })

  return (
    <main className={style.postsContainer}>
      <section className={style.newPostControl}>
        <Link to={`${props.match.params.category}/nueva-publicación`}><button className="custom-btn green-btn">Nueva publicación</button></Link>
      </section>
      {postsArray}
    </main>
  );
}

export default Posts;