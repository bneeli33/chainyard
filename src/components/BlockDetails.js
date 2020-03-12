import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'moment';
import { List, ListItem, ListItemText } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';

const BlockDetails = ({ block }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [blockDetails, setBlockDetails] = useState({});

  const URL = `https://apilist.tronscan.org/api/block?number=${block}`;

  useEffect(() => {
    axios.get(URL).then(({ data }) => {
      setIsLoaded(true);
      if (data.total > 0) {
        setBlockDetails(data.data[0]);
        setIsValid(true);
      }
    });
  }, [URL]);

  return (
    <List>
      {isLoaded ? (
        isValid ? (
          <div>
            <Typography variant="subtitle1" align="center">
              Block #<strong>{blockDetails.number}</strong>
            </Typography>
            <ListItem>
              <ListItemText
                primary="Status:"
                secondary={
                  blockDetails.confirmed ? (
                    <Chip label="Confirmed" color="secondary" />
                  ) : (
                    <Chip label="Unconfirmed" color="primary" />
                  )
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Hash:" secondary={blockDetails.hash} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Height:" secondary={blockDetails.number} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Time:"
                secondary={Moment(blockDetails.timestamp).format(
                  'MM/DD/YYYY kk:mm:ss'
                )}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Transactions::"
                secondary={blockDetails.nrOfTrx}
                Txns
              >
                <p>confirmed by {blockDetails.confirmations}</p>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Parent Hash::"
                secondary={blockDetails.parentHash}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Produced by:"
                secondary={blockDetails.witnessName}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Size:" secondary={blockDetails.number} />
            </ListItem>

            {/* <ListItem>
                  <ListItemText primary="Transactions:">
                    {blockDetails.confirmed ? 'Confirmed' : 'Unconfirmed'}{' '}
                    <p>confirmed by {blockDetails.confirmations}</p>
                  </ListItemText>
                </ListItem> */}

            {/* <ListItem>
                  <ListItemText primary="Status:" />
                  <ListItemText primary="Status:">Hash:</ListItemText>
                  <ListItemText primary="Status:">Height:</ListItemText>
                  <ListItemText>Time:</ListItemText>
                  <ListItemText>Transactions:</ListItemText>
                  <ListItemText>Parent Hash:</ListItemText>
                  <ListItemText>Produced by:</ListItemText>
                  <ListItemText>Size:</ListItemText>
                </ListItem> */}
            {/* <ListItem>
                  <ListItemText>
                    {blockDetails.confirmed ? 'Confirmed' : 'Unconfirmed'}{' '}
                    <span>confirmed by {blockDetails.confirmations}</span>
                  </ListItemText>
                  <ListItemText>{blockDetails.hash}</ListItemText>
                  <ListItemText>{blockDetails.number}</ListItemText>
                  <ListItemText>
                    {Moment(blockDetails.timestamp).format(
                      'MM/DD/YYYY kk:mm:ss'
                    )}
                  </ListItemText>
                  <ListItemText>{blockDetails.nrOfTrx} Txns</ListItemText>
                  <ListItemText>{blockDetails.parentHash}</ListItemText>
                  <ListItemText>{blockDetails.witnessName}</ListItemText>
                  <ListItemText>
                    {blockDetails.size.toLocaleString()}
                  </ListItemText>
                </ListItem> */}
          </div>
        ) : (
          <p>Block Not Found</p>
        )
      ) : (
        <p>Loading</p>
      )}
    </List>
  );
};

export default BlockDetails;
