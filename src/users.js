import * as React from "react";
import { useState, useEffect } from 'react';
import db from './FIREBASE_CONFIG';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function UserList() {
    const ref = db.collection('users');
    console.log('ref :',ref);

    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);

    function getData() {
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data())
        })
        setData(items);
        setLoader(false);
      })
    }

    useEffect(() => {
      getData();
    },[]);
    
    return(
        <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loader === false && (data.map((user) => (
                    <TableRow
                      key={user.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {user.id}
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.desc}</TableCell>
                    </TableRow>
                  )))}
                </TableBody>
              </Table>
        </TableContainer>
    );
}