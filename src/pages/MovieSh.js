import React from 'react';
import {
  TextField,
  ImageField,
  SimpleShowLayout,
  Show,
  TabbedShowLayout,
  RichTextField,
  Tab,
} from 'react-admin';
import { Stack, Drawer } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOne, useRedirect, Title } from 'react-admin';
import { useNavigate } from 'react-router-dom';

const MovieSh = ({ ...props }) => {
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
              width: '500px',
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
              <RichTextField source="overview" />
            </Tab>
          </TabbedShowLayout>
        </SimpleShowLayout>
      </Drawer>
    </Show>
  );
};

export default MovieSh;
