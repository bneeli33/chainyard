import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlocksTable from './BlocksTable';
import { Typography, MenuItem, FormControl, Select } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const Blocks = () => {
  const URL = 'https://apilist.tronscan.org/api/block';

  const [blocks, setBlocks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [blocksNo, setBlocksNo] = useState({});
  const [noPerPage, setNoPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0); // Zero-indexed
  const [isTableLoaded, setIsTableLoaded] = useState(true);

  useEffect(() => {
    axios
      .get(`${URL}?limit=${noPerPage}&start=${currentPage}`)
      .then(({ data }) => {
        setBlocksNo({ rangeTotal: data.rangeTotal, total: data.total });
        setBlocks(data.data);
        setIsLoaded(true);
      });
  }, [noPerPage, isLoaded, currentPage]);

  const updateTransactions = () => {
    setIsTableLoaded(false);
    axios
      .get(`${URL}?limit=${noPerPage}&start=${currentPage}`)
      .then(({ data }) => {
        setBlocks(data.data);
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
              A Total of <strong>{blocksNo.rangeTotal} </strong>Transactions
            </Typography>
          </div>

          <FormControl>
            <Select value={noPerPage} onChange={handleSelect}>
              <MenuItem value="10">10/page</MenuItem>
              <MenuItem value="20">20/page</MenuItem>
              <MenuItem value="30">30/page</MenuItem>
              <MenuItem value="40">40/page</MenuItem>
            </Select>
          </FormControl>

          <br />
          <BlocksTable isLoaded={isTableLoaded} blocks={blocks} />
          <br />
          <div>
            <div>
              <Pagination
                color="secondary"
                onChange={changePage}
                count={parseInt(blocksNo.total / noPerPage, 10)}
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

export default Blocks;
