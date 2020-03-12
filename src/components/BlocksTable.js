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

const BlocksTable = ({ isLoaded, blocks }) => {
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

  return (
    <TableContainer component={Paper}>
      {isLoaded ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Height</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Transactions</TableCell>
              <TableCell>Produced by</TableCell>
              <TableCell>Bytes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blocks.map((block) => {
              const otherDate = Moment(block.timestamp);
              const minutes = dateNow.diff(otherDate, 'minutes');
              const seconds = dateNow.diff(otherDate, 'seconds') - minutes * 60;
              return (
                <TableRow key={block.number}>
                  <TableCell>
                    <Link to={'/block/' + block.number} variant="primary">
                      {block.number}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {minutes > 0 ? `${minutes}mins ` : ''}
                    {seconds}secs ago
                  </TableCell>
                  <TableCell>
                    {block.confirmations > 0 ? (
                      <Chip
                        label="Confirmed"
                        color="secondary"
                        variant="outlined"
                      />
                    ) : (
                      <Chip
                        label="Unconfirmed"
                        color="Primary"
                        variant="outlined"
                      />
                    )}
                  </TableCell>
                  <TableCell>{block.nrOfTrx}</TableCell>
                  <TableCell>{block.witnessName}</TableCell>
                  <TableCell>{block.size.toLocaleString()}</TableCell>
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

export default BlocksTable;
