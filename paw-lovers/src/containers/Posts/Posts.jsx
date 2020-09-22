import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from '../../components/Post/Post.jsx';
import style from './Posts.module.css';
import firebase from '../../Firebase';
import { formattingDate } from './formattingDate.js';
import { connect } from 'react-redux';
import UpdatePostModal from '../UpdatePostModal/UpdatePostModal.jsx';
const db = firebase.firestore();
const auth = firebase.auth();

const Posts = (props) => {
  const [postsState, setPostsState] = useState([]);
  const [authState, setAuthState] = useState(false);
  const [updateModalState, setUpdateModalState] = useState(false);
  const [modalDataState, setModalDataState] = useState([]);


  const postActionHandler = (event) => {
    const postId = event.target.id;
    if (event.target.value === 'delete') {
      db.collection("Posts")
        .doc(`${postId}`)
        .delete()
        .then(() => {
          setPostsState((previousState) => {
            const newState = previousState.filter((post) => post.id !== postId);
            return [...newState];
          });
          console.log(
            `Publicación con id ${postId} eliminada correctamente de la base de datos de Firebase.`
          );
        });
    } else {
      setUpdateModalState({
        modalState: true
      })
      const selectedPost = postsState.filter((post) => post.id === postId);
      setModalDataState(selectedPost);
      console.log('Activando el modal de actualización de publicación');
    }
  }

  const closeUpdateModal = () => {
    setUpdateModalState({
      modalState: false
    })
  }

  // Lectura de posts y almacenamiento en estado
  useEffect(() => {
    let unsuscribe;
    if (props.match.params.category === 'inicio') {
    let posts = [];

      unsuscribe = db.collection('Posts').get().then((docs) => {
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
        .get().then((docs) => {
          docs.forEach((doc) => {
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
        postAction={(event) => postActionHandler(event)}
        key={post.id}
        category={post.category}
        author={post.author}
        title={post.title}
        content={post.content}
        likes={post.likes}
        comments={post.comments}
        date={post.timestamp}
        id={post.id}
      />
    );
  })



  return (
    <main className={style.postsContainer}>
      <UpdatePostModal modalState={updateModalState.modalState} modalDataState={modalDataState} closeModal={closeUpdateModal} clicked={(event) => updateHandler(event)}/>
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