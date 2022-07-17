import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  TextInput,
  SimpleShowLayout,
  Show,
  Pagination,
  TabbedShowLayout,
  RichTextField,
  Tab,
} from 'react-admin';
import '../App.css';
import { Box } from '@mui/material';
import { Stack, Drawer } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOne, useRedirect, Title } from 'react-admin';

import { useNavigate } from 'react-router-dom';

import MovieSh from './MovieSh';

const PostPagination = (props) => <Pagination rowsPerPageOptions={[]} {...props} />;

const PostFilter = [
  <TextInput label="Search by title" source="title" alwaysOn />,
  <TextInput label="Filter by year" source="year" />,
];

export const MovieList = ({ ...props }) => {
  return (
    <React.Fragment>
      <List
        debounce={2000}
        perPage={20}
        filters={PostFilter}
        pagination={<PostPagination />}
        {...props}
      >
        <Datagrid
          rowClick={(id) => {
            return `${id}`;
          }}
        >
          <TextField source="id" />
          <TextField source="title" />
          <TextField source="rating" />
          <TextField source="overview" />
          <TextField source="release" />
          <ImageField source="poster" className="thumbNailView" />
        </Datagrid>
      </List>
      <Routes>
        <Route path="/:id" element={<MovieSh />} />
      </Routes>
    </React.Fragment>
  );
};

export const MovieShow = (props) => {
  const { id } = useParams();
  const redirect = useRedirect();
  let navigate = useNavigate();
  const { data, isLoading } = useGetOne(
    'movie',
    { id },
    // redirect to the list if the book is not found
    { onError: () => redirect('/movie') }
  );
  const [showPanel, setShowPanel] = useState(true);

  const handleCloseClick = () => {
    setShowPanel(false);
    navigate('/movie');
  };

  return (
    <>
      <Show {...props}>
        <Drawer anchor="right" open={showPanel} onClose={handleCloseClick} {...props}>
          <SimpleShowLayout record={data} basePath="/movie" resource="movie">
            <Stack sx={{ padding: 2, marginLeft: '5px' }}>
              <ImageField source="poster" className="thumbNailViewShow" />
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
        </Drawer>
      </Show>
    </>
  );
};
