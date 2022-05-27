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
import { Button } from 'react-admin';
import { doc, deleteDoc } from 'firebase/firestore';


export function UserList() {
    const ref = database.collection('userLogin');

    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);

    function getData() {
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({
            data: doc.data(),
            id: doc.id
          })
        })
        setData(items);
        setLoader(false);
      })
    }

    useEffect(() => {
      getData();
    },[data]);

    const handleDelete = (id) => {
      const docRef = doc(database, 'userLogin', id);
    
      deleteDoc(docRef)
      .then(() => {
          console.log('Document deleted');
      })
      .catch(error => console.log(error.message))
      
    }


    return(
        <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                <TableHead>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loader === false && (data.map((user) => (
                    <TableRow
                      key={user.data.uid}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {user.data.uid}
                      </TableCell>
                      <TableCell>{user.data.name}</TableCell>
                      <TableCell>{user.data.email}</TableCell>
                      <TableCell>{user.data.role}</TableCell>
                      <TableCell><Button onClick={() => handleDelete(user.id) } style={{ backgroundColor: 'lightgray' }} label="delete" redirect={false}/></TableCell>
                    </TableRow>
                  )))}
                </TableBody>
              </Table>
        </TableContainer>
    );
}