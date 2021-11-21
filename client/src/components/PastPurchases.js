import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Axios from 'axios';

const PastPurchases = (props) => 
{
    console.log(props.userInfo.username)
    const [pastOrders, setPastOrder] = useState([]);

    useEffect(() => {
        getpastPurchases();
      }, []);

    const getpastPurchases = async () =>
    {     
        try
        {
            const response = Axios.post('http://localhost:5000/pastPurchases',
            {
                username: props.userInfo.username
            })
        }
        catch(error)
        {
            console.log(error.message)
        }
        
    }
    return (
    <Container maxWidth="md">
        <TableContainer component = {Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>

            
            </Table>
        </TableContainer>
    </Container>
    )
}
export default PastPurchases