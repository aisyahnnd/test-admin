import * as React from "react";
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const CommentList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="body" />
        </Datagrid>
    </List>
);