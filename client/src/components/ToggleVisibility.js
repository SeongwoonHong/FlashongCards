import React, { Fragment, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ApolloConsumer } from 'react-apollo';

const getVisibilityByStatus = (visibility) => {
  switch (visibility) {
    case 0:
      return 'ACTIVE';
    case 1:
      return 'COMPLETED';
    case 2:
      return 'ARCHIVE';
    default:
      return 'ACTIV#E';
  }
}

const ToggleVisibility = ({ visibilityFilter, loading }) => {
  const [index, setIndex] = useState(0);

  if (loading) return null;

  function setIndexAndVisibility(client, value) {
    setIndex(value);
    client.writeData({ data: { visibilityFilter: getVisibilityByStatus(value) }})
  }

  return (
    <ApolloConsumer>
      {client => (
        <Fragment>
          <AppBar position="static" color="inherit">
            <Tabs
              value={index}
              onChange={(e, value) => setIndexAndVisibility(client, value)}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Active" />
              <Tab label="Completed" />
              {/* <Tab label="Archive" /> */}
            </Tabs>
          </AppBar>
        </Fragment>
      )}
    </ApolloConsumer>
  );
};

ToggleVisibility.propTypes = {
  
};


export default ToggleVisibility;
