import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  TextInput,
  Filter,
  SimpleShowLayout,
  Show,
  ShowButton,
  Pagination,
  SearchInput,
  TabbedShowLayout,
  RichTextField,
  Tab,
  Labeled,
  ReferenceInput,
  SelectInput,
  NumberInput,
  Toolbar,
  translate,
  Edit,
} from 'react-admin';
import '../App.css';
import { Box } from '@mui/material';
import { Card, Stack, Button, Drawer } from '@mui/material';
import { Routes, Route } from 'react-router';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOne, useRedirect, Title } from 'react-admin';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const MovieShow = (props) => {
  const { id } = useParams(); // this component is rendered in the /books/:id path
  const redirect = useRedirect();
  const { data, isLoading } = useGetOne(
    'movie',
    { id },
    // redirect to the list if the book is not found
    { onError: () => redirect('/movie') }
  );

  return (
    <>
      <Show {...props}>
        <SimpleShowLayout record={data} basePath="/movie" resource="movie">
          <Stack sx={{ padding: 2, marginLeft: '5px' }}>
            <div style={{ display: 'inline-block', position: 'relative' }}>
              <TextField source="title" sx={{ fontSize: 30 }} /> {''}
              <TextField source="rating" sx={{ fontSize: 15 }} />
            </div>
          </Stack>

          <TabbedShowLayout
            sx={{
              width: '700px',
              height: '410px',
              marginLeft: '10px',
              marginRight: '10px',
              position: 'relative',
            }}
          >
            <Tab label="summary">
              <TextField label="Id" source="id" />
              <TextField source="title" />
              <TextField source="popularity" />
              <TextField source="release" />
            </Tab>
            <Tab label="overview" path="overview">
              <RichTextField source="overview" label={false} />
            </Tab>
          </TabbedShowLayout>
        </SimpleShowLayout>
      </Show>
    </>
  );
};
