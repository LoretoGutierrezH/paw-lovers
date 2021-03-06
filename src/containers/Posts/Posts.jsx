import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Post from '../../components/Post/Post.jsx';
import style from './Posts.module.css';
import firebase from '../../Firebase';
import { formattingDate } from './formattingDate.js';
import { connect } from 'react-redux';
import UpdatePostModal from '../UpdatePostModal/UpdatePostModal.jsx';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal.jsx';
import * as actionTypes from '../../store/actionTypes';
const db = firebase.firestore();
const auth = firebase.auth();

const Posts = (props) => {
    const [postsState, setPostsState] = useState([]);
    const [authState, setAuthState] = useState(false);
    const [updateModalState, setUpdateModalState] = useState({modalState: false});
    const [errorState, setErrorState] = useState(false);
    const [successState, setSuccessState] = useState(false);
    const [confirmationModalState, setConfirmationModalState] = useState({modalState: false});

  //Para render de posts de index y por categoría con unsuscribe
  useEffect(() => {
    props.closeBurgerMenu();
    let unsuscribe = null;
    let posts;
    if (window.location.pathname === "/") {
      console.log('posts antes de llenado', posts);
      unsuscribe = db.collection('Posts').orderBy("timestamp", "desc").onSnapshot((docs) => {
      posts = [];
      docs.forEach(doc => {
          if (!doc.data().timestamp && doc.metadata.hasPendingWrites) {
          console.log("EL DOCUMENTO TIENE LA HORA PENDIENTE", doc.data().id);
          }

          if (doc.metadata.hasPendingWrites) {
            console.log('algo está pendiente!!', doc.data().title, doc.data().likes)
          }
          const postObject = {
          id: doc.id,
          author: doc.data().author,
          uid: doc.data().uid,
          category: doc.data().category,
          comments: doc.data().comments,
          content: doc.data().content,
          likes: doc.data().likes,
          timestamp: !doc.data().timestamp && doc.metadata.hasPendingWrites ?  "Hora en proceso" : formattingDate(doc),
          title: doc.data().title,
          };
          posts.push(postObject);
      })

        console.log("LIKE GENERÓ EJECUCIÓN DE ONSNAPSHOT!!!");
        setPostsState(posts); //tiene que estar aquí o posts = []
      })
    } else {
      let posts;
      db.collection("Posts")
      .where("category", "==", `${props.match.params.category}`).orderBy("timestamp", "desc")
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          const postObject = {
            id: doc.id,
            author: doc.data().author,
            uid: doc.data().uid,
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
    }
    if (unsuscribe !== null) {
      return () => {
        unsuscribe();
      } 
    }
   
  }, [setPostsState, props.match.params.category]);


const likeOrUnlike = (event) => {
  //agregar a array de likes, en la vista parcial solo se debe ver el número de likes y en la vista de detalle se debe activar un modal con la lista de nombres de usuario
  const authorUid = event.target.parentElement.parentElement.getAttribute('data-userid');
  const postId = event.target.parentElement.parentElement.getAttribute('data-postid');

    db.collection('Posts').doc(`${postId}`).get().then((doc) => {
      const docLikes = doc.data().likes;
      console.log(docLikes);
      const includesUser = docLikes.includes(`${firebase.auth().currentUser.displayName}`);
      console.log(includesUser);
      if (includesUser === true) {
        db.collection('Posts').doc(`${postId}`).update({
          likes: firebase.firestore.FieldValue.arrayRemove(`${firebase.auth().currentUser.displayName}`),
        })
      } else if (includesUser === false) {
        db.collection('Posts').doc(`${postId}`).update({
          likes: firebase.firestore.FieldValue.arrayUnion(`${firebase.auth().currentUser.displayName}`),
        })
      }
    });
}

const updateOrDelete = (event) => {
  const postId = event.currentTarget.getAttribute("data-postid");
  const authorUid = event.currentTarget.getAttribute("data-userid");

  //Eliminar post
  if (event.target.id === "delete" && props.userId === authorUid) {
      console.log("tienes permiso para eliminar el post");
      setConfirmationModalState({modalState: true, postId});
  } else if (event.target.id === "delete" && props.userId !== authorUid) {
    console.log("no tienes permiso para eliminar el post");
  }

  //Actualizar post
  if (event.target.id === "update" && props.userId === authorUid) {
    const postTitle = event.currentTarget.getAttribute("data-posttitle");
    const postContent = event.currentTarget.getAttribute("data-postcontent");
    setUpdateModalState({modalState: true, postTitle, postContent, postId});
  } else if (event.target.id === "update" && props.userId === authorUid) {
    console.log("no tienes permiso para actualizar el post");
  }
  //transformar title y content en inputs de edición, actualizar solo si pertenece al usuario actual
  //*** aprender a hacerlo así, pero implementar la opción de edición vía modal */
 
}

const deletePost = (event) => {
  //eliminar publicación solo si pertenece al usuario actual
}
    
// Llenando Post con información almacenada en el estado
let postsArray = null;
postsArray = postsState.map(post => {
  return (
    <Post
      updateOrDelete={(event) => updateOrDelete(event)}
      key={post.id}
      category={post.category}
      author={post.author}
      title={post.title}
      content={post.content}
      likes={post.likes}
      comments={post.comments}
      date={post.timestamp}
      id={post.id}
      uid={post.uid}
      clicked={likeOrUnlike}
    />
  );
})

let whereTo = null;
if (props.authenticated === false) {
  whereTo = null;
} else if (props.authenticated === true && props.match.params.category !== undefined) {
  whereTo = <Link to={`${props.match.params.category}/nueva-publicación`}><button className="custom-btn green-btn">Nueva publicación</button></Link>;
} else {
  whereTo = <Link to="/nueva-publicación"><button className="custom-btn green-btn">Nueva publicación</button></Link>;
}

console.log(postsArray);
console.log(props.burgerState);

    return (
    <main className={style.postsContainer}>
        {errorState ? <Redirect to="/404"></Redirect> : null}
        <UpdatePostModal modalState={updateModalState} setModalState={setUpdateModalState} /* clicked={(event) => updateHandler(event)} */ successMessage={successState}/>
        <ConfirmationModal confirmationState={confirmationModalState} setConfirmationState={setConfirmationModalState} />
        <section className={style.newPostControl}>
            {whereTo}
        </section>
        {postsArray}
    </main>
    );
}


const mapStateToProps = (state) => {
    return {
      authenticated: state.authReducer.authenticated,
      userId: state.authReducer.userId,
      burgerState: state.burgerMenuReducer.burgerState
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openBurgerMenu: () => dispatch({type: actionTypes.OPEN}),
    closeBurgerMenu: () => dispatch({type: actionTypes.CLOSE})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
