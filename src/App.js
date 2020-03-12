import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Transactions from './components/Transactions';
import Blocks from './components/Blocks';
import BlockDetails from './components/BlockDetails';
import TransactionDetails from './components/TransactionDetails';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <div>
      <div></div>
      <Container>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Blocks} />
            <Route path="/blocks" exact component={Blocks} />
            <Route path="/block/:block" exact component={BlockDetails} />
            <Route path="/transactions" exact component={Transactions} />
            <Route
              path="/transaction/:transaction"
              exact
              component={TransactionDetails}
            />
            {/* <Transactions path="/transactions" />
          <Blocks path="/blocks" />
          <BlockDetails path="/block/:block" />
          <TransactionDetails path="/transaction/:transaction" /> */}
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
