import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import { GET_ALL_CARDS_QUERY } from 'queries';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import FlipCardList from './FlipCardList';
import CardList from './CardList';
import { Button } from 'components';
import Tab from './Tab';
import styled from 'styled-components';

const App = ({ cards, visibilityFilter = 'ACTIVE', loading, history }) => {
  const [mode, setMode] = useState('list');

  function navigateToAddCard() {
    history.push('/main/add-card');
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }

  function countTotalNumberOfField(field) {
    return cards.reduce((count, a) => a[field] ? count + 1 : count, 0);
  }

  function renderBody() {
    if (mode === 'list') {
      return (
        <Fragment>
          <StyledTabContainer>
            <Tab
              text="All Cards"
              count={cards.length}
              isActive
            />
            <Tab
              text="Favorites"
              count={countTotalNumberOfField('is_favorite')}
            />
            <Tab
              text="Studied"
              count={countTotalNumberOfField('is_studied')}
            />
          </StyledTabContainer>
          <CardList cards={cards} />
        </Fragment>
      );
    }
    return (
      <FlipCardList cards={cards} />
    );
  }

  return (
    <Fragment>
      <StyledButtonContainer>
        <Button
          onClick={() => mode === 'list' ? setMode('study') : setMode('list')}
        >
          { mode === 'list' ? 'Study' : 'See List' }
        </Button>
      </StyledButtonContainer>
      {renderBody()}
      <Fab color="primary" onClick={navigateToAddCard}>
        <AddIcon />
      </Fab>
    </Fragment>
  );
}

const withGetCardList = graphql(GET_ALL_CARDS_QUERY, {
  options: (props) => ({
    variables: {
      user_id: 1, // for now it's hard coded
    },
  }),
  props: ({ data: { cards, loading } }) => ({
    cards,
    loading,
  })
})

const StyledButtonContainer = styled.div`
  width: 50%;
  margin: 20px auto 10px auto;
`;

const StyledTabContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default compose(
  withRouter,
  withGetCardList)
(App);
