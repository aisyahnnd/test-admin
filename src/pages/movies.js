import * as React from "react";
import { List, Datagrid, TextField, ImageField, TextInput, SearchInput, ReferenceInput, SelectInput } from 'react-admin';
import '../App.css';
import { FilterLiveSearch } from 'react-admin';

const postFilters = [
    <TextInput source="title" label="Search" alwaysOn />,
    // <FilterLiveSearch source="title" />
    // <ReferenceInput source="rating" label="Rating" reference="movies">
    //     <SelectInput optionText="rating" />
    // </ReferenceInput>,
];

export const MovieList = (props) => (
    <List {...props} filters={postFilters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="rating" />
            <TextField source="overview" />
            <ImageField source="poster" className="thumbNailView" />
        </Datagrid>
    </List>
);