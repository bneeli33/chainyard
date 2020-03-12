import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@material-ui/core';

const TransactionsTable = ({ transactions, isLoaded }) => {
  const [dateNow, setDateNow] = useState(Moment(new Date()));

  useEffect(() => {
    const timeInterval = setInterval(
      () => setDateNow(Moment(new Date())),
      1000
    );
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 10) : str;
  };

  return (
    <TableContainer component={Paper}>
      {isLoaded ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Block</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Transaction type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => {
              const otherDate = Moment(transaction.timestamp);
              const minutes = dateNow.diff(otherDate, 'minutes');
              const seconds = dateNow.diff(otherDate, 'seconds') - minutes * 60;
              return (
                <TableRow key={transaction.hash}>
                  <TableCell>
                    <Link to={'/transaction/' + transaction.hash}>
                      {truncate(transaction.hash)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to="/">{transaction.block}</Link>
                  </TableCell>
                  <TableCell>
                    {minutes > 0 ? `${minutes}mins ` : ''}
                    {seconds}secs ago
                  </TableCell>
                  <TableCell>
                    {transaction.confirmed ? (
                      <Chip
                        label="Confirmed"
                        color="secondary"
                        variant="outlined"
                      />
                    ) : (
                      <Chip
                        label="Unconfirmed"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link to="/">{truncate(transaction.ownerAddress)}</Link>
                  </TableCell>
                  <TableCell>
                    {transaction.contractType === 31
                      ? 'Trigger Smart Contracts'
                      : 'Transfer TRX'}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <p>Loading</p>
      )}
    </TableContainer>
  );
};

export default TransactionsTable;
