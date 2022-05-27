import * as React from "react";
import { 
    List,
    Datagrid,
    TextField,
    ImageField,
    TextInput,
    Filter,
} from 'react-admin';
import '../App.css';

const PostFilter = (props) => (
    <Filter {...props}>
      <TextInput label="Search" source="title" alwaysOn />
    </Filter>
);

export const MovieList = (props) => (
    <List {...props} filters={<PostFilter />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="rating" />
            <TextField source="overview" />
            <ImageField source="poster" className="thumbNailView" />
        </Datagrid>
    </List>
);