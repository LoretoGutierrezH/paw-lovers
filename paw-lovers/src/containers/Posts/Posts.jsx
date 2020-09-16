import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from '../../components/Post/Post.jsx';
import style from './Posts.module.css';
import firebase from '../../Firebase';

const db = firebase.firestore();
const auth = firebase.auth();

const Posts = (props) => {
  const [postsState, setPostsState] = useState([]);
  const formattingDate = (doc) => {
    console.log("Leyendo timestamp", doc.data());
    const formattedDate = doc.data().timestamp.toDate().toString();
    const splitDate = formattedDate.split(" ");
    // console.log(splitDate[1], splitDate[2], splitDate[3], splitDate[4]);
    let month;
    switch (splitDate[1]) {
      case 'Jan':
        month = "Enero";
        break;
      case 'Feb':
        month = "Febrero";
        break;
      case 'Mar':
        month = "Marzo";
        break;
      case 'Apr':
        month = "Abril";
        break;
      case 'May':
        month = "Mayo";
        break;
      case 'Jun':
        month = "Junio";
        break;
      case 'Jul':
        month = "Julio";
        break;
      case 'Aug':
        month = "Agosto";
        break;
      case 'Sep':
        month = "Septiembre";
        break;
      case 'Oct':
        month = "Octubre";
        break;
      case 'Nov':
        month = "Noviembre";
        break;
      case 'Dec':
        month = "Dicimebre";
        break;
      default:
        month = "Mes";
    }
    return `${splitDate[2]} de ${month} del ${splitDate[3]} a las ${splitDate[4]}`;
  };
  // Lectura de posts y almacenamiento en estado
  let posts = [];

  useEffect(() => {
    let unsuscribe;
    if (props.match.params.category === 'inicio') {
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
      unsuscribe = db.collection("Posts")
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
        date={post.timestamp}
        
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