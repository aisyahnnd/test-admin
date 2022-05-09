import * as React from "react";
import { List, Datagrid, TextField, ImageField } from 'react-admin';

export const MovieList = (props) => (
    <List {...props}>
        <Datagrid>
            <ImageField source="backPoster" />
            <TextField source="id" />
            <TextField source="overview" />
            <TextField source="popularity" />
            <ImageField source="poster" />
            <TextField source="rating" />
            <TextField source="title" />
        </Datagrid>
    </List>
);