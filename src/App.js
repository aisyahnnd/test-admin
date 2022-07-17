import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import Dashboard from './pages/Dashboard';
import Provider from './provider/getDataProvider';
import { MovieList, MovieShow } from './pages/movies';
import { UserList, UserShow, UserEdit, UserCreate } from './pages/users';
import { FavoriteList } from './pages/favorites';
import './App.css';
import firebase from './FIREBASE_CONFIG';
import { FirebaseAuthProvider } from 'react-admin-firebase';
import GroupIcon from '@mui/icons-material/Group';
import FavoriteIcon from '@mui/icons-material/Favorite';

const dataProvider = Provider;

const options = {
  logging: true,
  rootRef: 'root_collection/some_document',
};
const authProvider = FirebaseAuthProvider(firebase, options);

const App = () => {
  return (
    <Admin
      dashboard={Dashboard}
      dataProvider={dataProvider}
      authProvider={authProvider}
      requireAuth
    >
      <Resource name="movie" list={MovieList} icon={MovieFilterIcon} />
      <Resource
        name="user"
        list={UserList}
        show={UserShow}
        edit={UserEdit}
        create={UserCreate}
        icon={GroupIcon}
      />
      <Resource name="favorite" list={FavoriteList} icon={FavoriteIcon} />
    </Admin>
  );
};

export default App;
