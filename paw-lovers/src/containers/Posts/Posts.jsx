import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from '../../components/Post/Post.jsx';
import style from './Posts.module.css';
import firebase from '../../Firebase';

const db = firebase.firestore();
const auth = firebase.auth();

const Posts = (props) => {
  console.log(props.match.params.category);
  const [postsState, setPostsState] = useState('');

  const formattingDate = (doc) => {
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
  };
  // Lectura de posts y almacenamiento en estado
  useEffect(() => {
    db.collection('Posts').onSnapshot(docs => {
      docs.forEach(doc => {
        console.log("algo", doc.data());
        setPostsState({
          post: {
            author: doc.data().author,
            category: doc.data().category,
            comments: doc.data().comments,
            content: doc.data().content,
            likes: doc.data().likes,
            timestamp: formattingDate(doc),
            title: doc.data().title

          }
        })
      });
    })
  }, []);

  // Side effect para comprobar correcta asignación de posts a estado
  useEffect(() => {
    console.log(postsState);
  }, [postsState])


  // Lógica provisoria de population de container Post
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
        <Link to={`${props.match.params.category}/nueva-publicación`}><button className="custom-btn green-btn">Nueva publicación</button></Link>
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