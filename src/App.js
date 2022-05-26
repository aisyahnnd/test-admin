import * as React from "react";
import { Admin, Resource } from 'react-admin';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import Dashboard from './pages/Dashboard';
import Provider from './provider/getList';
import { MovieList } from './pages/movies';
import { UserList } from './pages/users';
import { FavoriteList } from './pages/favorites';
import { useState, useEffect } from 'react'; 
import './App.css';
import firebase from './FIREBASE_CONFIG'; 
import { database } from './FIREBASE_CONFIG'; 
import { FirebaseAuthProvider } from "react-admin-firebase";
import { getDocs } from 'firebase/firestore';
import GroupIcon from '@mui/icons-material/Group';
import FavoriteIcon from '@mui/icons-material/Favorite';

const dataProvider = Provider;

const options = {
  logging: true,
  rootRef: 'root_collection/some_document',
}
const authProvider = FirebaseAuthProvider(firebase, options);


const App = () => {
  // const [user, setUser] = useState([]);

  // const getUser = async () => {
  //   const userCollectionRef = database.collection('userLogin');

  //   await getDocs(userCollectionRef)
  //   .then(response => {
  //       const users = response.docs.map(doc => ({
  //           data: doc.data(),
  //           id: doc.id,
  //       }))

  //       const roles = [];
  //       users.forEach(r => {
  //         roles.push({
  //           role : r.data.role,
  //           uid: r.data.uid
  //         });
  //       })
  //       console.log(777,{roles})
  //       setUser(roles)
  //   })
  //   .catch(error => console.log(error.message))
  // }

  // const authListener = (uid) => {
  //   firebase.auth().onAuthStateChanged((user) => { 
  //     if (user) {
  //       clearInputs();
  //       setUser(user);
  //     } else {
  //       setUser("");
  //     }
      
  //   });
  // }

  // useEffect(() => {
  //   authListener();
  //   getUser();
  // }, [])


  return (
    <>
      <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider}> 
        <Resource name="movie" list={MovieList} icon={MovieFilterIcon} />
        <Resource name="users" list={UserList} icon={GroupIcon} />
        <Resource name="favorite" list={FavoriteList} icon={FavoriteIcon} />
      </Admin>
    </>
  );
};

export default App;