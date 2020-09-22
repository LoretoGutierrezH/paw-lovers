import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from '../../components/Post/Post.jsx';
import style from './Posts.module.css';
import firebase from '../../Firebase';
import { formattingDate } from './formattingDate.js';
import { connect } from 'react-redux';
const db = firebase.firestore();
const auth = firebase.auth();

const Posts = (props) => {
  const [postsState, setPostsState] = useState([]);
  const [authState, setAuthState] = useState(false);
  // Lectura de posts y almacenamiento en estado

  useEffect(() => {
    let unsuscribe;
    if (props.match.params.category === 'inicio') {
    let posts = [];

      unsuscribe = db.collection('Posts').onSnapshot((docs) => {
        docs.forEach(doc => {
          if (!doc.data().timestamp && doc.metadata.hasPendingWrites) {
            console.log("EL DOCUMENTO TIENE LA HORA PENDIENTE", doc.data().id);
          }
          const postObject = {
            id: doc.id,
            author: doc.data().author,
            category: doc.data().category,
            comments: doc.data().comments,
            content: doc.data().content,
            likes: doc.data().likes,
            timestamp: !doc.data().timestamp && doc.metadata.hasPendingWrites ?  "Hora en proceso" : formattingDate(doc),
            title: doc.data().title,
          };
          posts.push(postObject);
        })
        setPostsState(posts); //tiene que estar aquí o posts = []
      })
      console.log("Después del primer render: UseEffect de Fetch solo para inicio");
    } else {
      let posts = [];
      db.collection("Posts")
        .where("category", "==", `${props.match.params.category}`)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            console.log('debugger', doc.data());
            const postObject = {
              id: doc.id,
              author: doc.data().author,
              category: doc.data().category,
              comments: doc.data().comments,
              content: doc.data().content,
              likes: doc.data().likes,
              timestamp: !doc.data().timestamp && doc.metadata.hasPendingWrites ?  "Hora en proceso" : formattingDate(doc),
              title: doc.data().title,
            };
            posts.push(postObject);
          });
          setPostsState(posts);
        });
      console.log("Después del primer render: UseEffect de Fetch");
    }

    
      //unsuscribe();
    
  }, [props.match.params.category]);

  // Llenando Post con información almacenada en el estado
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
        date={post.timestamp}
        
      />
    );
  })

  return (
    <main className={style.postsContainer}>
      <section className={style.newPostControl}>
        {props.authenticated === true ? <Link to={`${props.match.params.category}/nueva-publicación`}><button className="custom-btn green-btn">Nueva publicación</button></Link> : null}
      </section>
      {postsArray}
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated
  }
}

export default connect(mapStateToProps)(Posts);