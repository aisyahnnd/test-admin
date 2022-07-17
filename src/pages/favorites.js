import * as React from 'react';
import { useState, useEffect } from 'react';
import { database } from '../FIREBASE_CONFIG';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { List } from 'react-admin';

export function FavoriteList() {
  const [data, setData] = useState([]);
  const posterUrl = 'https://image.tmdb.org/t/p/original/';
  const ref = database.collection('movies');

  function getData() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      const filteredData = [];
      items.forEach((item) => {
        // console.log(item.movie.id)
        if (filteredData.some((filter) => filter.movie.id === item.movie.id)) {
          filteredData.forEach((fil) => {
            if (fil.movie.id === item.movie.id) {
              fil.users.push({
                userId: item.userId,
                email: item.email,
              });
            }
          });
        } else {
          filteredData.push({
            users: [
              {
                userId: item.userId,
                email: item.email,
              },
            ],
            movie: item.movie,
          });
        }
      });
      console.log({ items });
      console.log({ filteredData });
      setData(filteredData);
    });
  }

  useEffect(() => {
    getData();
  });

  return (
    <div style={{ paddingTop: 20 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Poster</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Overview</TableCell>
              <TableCell>Liked by User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((mov) => (
              <TableRow
                key={mov.movie.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={posterUrl + mov.movie.poster_path}
                    style={{ width: '150px', borderRadius: '10px' }}
                    alt={mov.movie.title || mov.movie.name}
                  />
                </TableCell>
                <TableCell>{mov.movie.title || mov.movie.name}</TableCell>
                <TableCell>{mov.movie.overview}</TableCell>
                <TableCell>
                  {mov.users.map((i) => (
                    <p>{i.email}</p>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
