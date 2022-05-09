import * as React from "react";
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UserList } from './users';
import { CommentList } from './comments';
import { PostList, PostEdit, PostCreate } from './posts';
import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import Dashboard from './Dashboard';
import authProvider from './authProvider';

import Provider from './provider/getList';
import { MovieList } from './movies';

const dataProvider = Provider;

const App = () => (
    // <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
    //     <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
    //     <Resource name="users" list={UserList} icon={UserIcon} />
    //     <Resource name="comments" list={CommentList} icon={CommentIcon} />
    // </Admin>
    <Admin dataProvider={dataProvider}>
        <Resource name="MovieList" list={MovieList} />
    </Admin>
);

export default App;