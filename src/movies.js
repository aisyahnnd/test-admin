import * as React from "react";
import { List, Datagrid, TextField, ImageField } from 'react-admin';
import './App.css';
import MyImageField from './MyImageField';

export const MovieList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="rating" />
            <TextField source="popularity" />
            <TextField source="overview" />
            <ImageField source="poster" className="thumbNailView" />
        </Datagrid>
    </List>
);