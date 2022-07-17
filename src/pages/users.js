import React from 'react';
import {
  Datagrid,
  List,
  Show,
  Filter,
  SimpleShowLayout,
  TextField,
  TextInput,
  ShowButton,
  DeleteButton,
  SearchInput,
  Edit,
  SimpleForm,
  required,
  Create,
  SelectInput,
} from 'react-admin';
import Button from '@mui/material/Button';
import { EditButton, TopToolbar } from 'react-admin';

const UserShowActions = () => (
  <TopToolbar>
    <EditButton />
  </TopToolbar>
);

const PostFilter = [<SearchInput source="name" alwaysOn />];

export const UserList = (props) => (
  <List {...props} filters={PostFilter}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="role" />
      <ShowButton label="Show" />
      <DeleteButton label="Delete" redirect={false} />
    </Datagrid>
  </List>
);

export const UserShow = (props) => (
  <Show {...props} actions={<UserShowActions />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="role" />
    </SimpleShowLayout>
  </Show>
);

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="name" validate={required()} />
      <TextInput multiline source="email" validate={required()} />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput disabled label="Auto-Id" source="id" />
      <TextInput source="name" />
      <TextInput type="email" source="email" />
      <TextInput type="password" source="password" />
      <SelectInput
        source="role"
        choices={[
          { id: 'admin', name: 'Admin' },
          { id: 'user', name: 'User' },
        ]}
      />
    </SimpleForm>
  </Create>
);
