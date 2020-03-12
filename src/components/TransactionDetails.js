import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'moment';
import { List, ListItem, ListItemText, Chip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const TransactionDetails = ({ transaction }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState({});

  const URL = `https://apilist.tronscan.org/api/transaction-info?hash=${transaction}`;

  useEffect(() => {
    axios.get(URL).then(({ data }) => {
      setIsLoaded(true);
      if (data.hash) {
        setTransactionDetails(data);
        setIsValid(true);
      }
    });
  }, [URL]);

  return (
    <List>
      {isLoaded ? (
        isValid ? (
          <div>
            <div>
              <Typography variant="subtitle1" align="center">
                Hash #<strong>{transactionDetails.hash}</strong>
              </Typography>
              <div className="d-flex">
                <ListItem>
                  <ListItemText
                    primary="Result:"
                    secondary={transactionDetails.contractRet}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Status:"
                    secondary={
                      transactionDetails.confirmed ? (
                        <Chip label="Confirmed" color="secondary" />
                      ) : (
                        <Chip label="Unconfirmed" color="primary" />
                      )
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Block:"
                    secondary={transactionDetails.block}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Time:"
                    secondary={Moment(transactionDetails.timestamp).format(
                      'MM/DD/YYYY kk:mm:ss'
                    )}
                  />
                </ListItem>
                {/* <div>
                    <p>Result:</p>
                    <p>Status:</p>
                    <p>Block:</p>
                    <p>Time:</p>
                  </div> */}
                {/* <div>
                    <p>{transactionDetails.contractRet}</p>
                    <p>
                      {transactionDetails.confirmed
                        ? 'Confirmed'
                        : 'Unconfirmed'}
                    </p>
                    <p>{transactionDetails.block}</p>
                    <p>
                      {Moment(transactionDetails.timestamp).format(
                        'MM/DD/YYYY kk:mm:ss'
                      )}
                    </p>
                  </div> */}
              </div>
            </div>
          </div>
        ) : (
          <p>Transaction Not Found</p>
        )
      ) : (
        <p>Loading</p>
      )}
    </List>
  );
};

export default TransactionDetails;
