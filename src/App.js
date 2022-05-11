import * as React from "react";
import { Admin, Resource } from 'react-admin';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import Dashboard from './Dashboard';
import authProvider from './authProvider';

import Provider from './provider/getList';
import { MovieList } from './movies';
import { UserList } from './users';

const dataProvider = Provider;

const App = () => (
    <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="moviepopular" list={MovieList} icon={MovieFilterIcon} />
      <Resource name="movieplayingnow" list={MovieList} icon={MovieFilterIcon} />
      <Resource name="users" list={UserList} />
    </Admin>
);

export default App;