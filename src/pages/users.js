import * as React from "react";
import { useState, useEffect } from 'react';
import { database } from '../FIREBASE_CONFIG';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function UserList() {
    const ref = database.collection('userLogin');
    console.log(888,'ref :',ref);

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
                    <TableCell>User ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loader === false && (data.map((user) => (
                    <TableRow
                      key={user.uid}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {user.uid}
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                    </TableRow>
                  )))}
                </TableBody>
              </Table>
        </TableContainer>
    );
}