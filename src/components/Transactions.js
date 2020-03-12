import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TransactionsTable from './TransactionsTable';
import { Typography, MenuItem, Select, FormControl } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const Transactions = () => {
  const URL = 'https://apilist.tronscan.org/api/transaction';

  const [transactions, setTransactions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [transactionsNo, setTransactionsNo] = useState({});
  const [noPerPage, setNoPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0); // Zero-indexed
  const [isTableLoaded, setIsTableLoaded] = useState(true);

  useEffect(() => {
    axios
      .get(`${URL}?limit=${noPerPage}&start=${currentPage}`)
      .then(({ data }) => {
        setTransactionsNo({ rangeTotal: data.rangeTotal, total: data.total });
        setTransactions(data.data);
        setIsLoaded(true);
      });
  }, [noPerPage, isLoaded, currentPage]);

  const updateTransactions = () => {
    setIsTableLoaded(false);
    axios
      .get(`${URL}?limit=${noPerPage}&start=${currentPage}`)
      .then(({ data }) => {
        setTransactions(data.data);
        setIsTableLoaded(true);
      });
  };

  const handleSelect = (e) => {
    setNoPerPage(+e.target.value);
    setIsLoaded(false);
  };

  const changePage = (data) => {
    setCurrentPage(data.selected * noPerPage);
    updateTransactions();
  };

  return (
    <div>
      {isLoaded ? (
        <div>
          <div>
            <Typography variant="subtitle1" align="center">
              A Total of <strong>{transactionsNo.rangeTotal}</strong>{' '}
              Transactions
            </Typography>
          </div>
          <div>
            <FormControl margin="right">
              <Select value="10" onChange={handleSelect}>
                <MenuItem value="10">10/page</MenuItem>
                <MenuItem value="20">20/page</MenuItem>
                <MenuItem value="30">30/page</MenuItem>
                <MenuItem value="40">40/page</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <TransactionsTable
            isLoaded={isTableLoaded}
            transactions={transactions}
          />
          <br />
          <div>
            <div>
              <Pagination
                color="secondary"
                onChange={changePage}
                count={parseInt(transactionsNo.total / noPerPage, 10)}
              />
            </div>
          </div>
        </div>
      ) : (
        <Typography variant="h5">Loading...</Typography>
      )}
    </div>
  );
};

export default Transactions;
