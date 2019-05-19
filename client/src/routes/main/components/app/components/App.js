import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import { GET_ALL_CARDS_QUERY, GET_CURRENT_USER } from 'queries';
import { Button, Loader, Footer } from 'components';
import styled from 'styled-components';
import FlipCardList from './FlipCardList';
import CardList from './CardList';
import Tab from './Tab';

const App = ({ cards, loading, history, currentUser }) => {
  const [mode, setMode] = useState('list');
  const [tabFilter, setTabFilter] = useState('All');

  function navigateToAddCard() {
    history.push('/main/add-card');
  }
  
  if (loading) {
    return <Loader />;
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
              onClick={() => setTabFilter('All')}
              isActive={tabFilter === 'All'}
            />
            <Tab
              text="Favorites"
              count={countTotalNumberOfField('is_favorite')}
              onClick={() => setTabFilter('Favorites')}
              isActive={tabFilter === 'Favorites'}
            />
            <Tab
              text="Studied"
              count={countTotalNumberOfField('is_studied')}
              onClick={() => setTabFilter('Studied')}
              isActive={tabFilter === 'Studied'}
            />
          </StyledTabContainer>
          <CardList
            cards={cards}
          />
        </Fragment>
      );
    }

    return (
      <FlipCardList
        cards={cards}
        currentUser={currentUser}
      />
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
      <Footer
        navigateToAddCard={navigateToAddCard}
        isHide={mode === 'study'}
      />
    </Fragment>
  );
}

const withCurrentUser = graphql(GET_CURRENT_USER, {
  props: ({ data: { currentUser } }) => ({
    currentUser
  })
})

const withGetCardList = graphql(GET_ALL_CARDS_QUERY, {
  options: ({ currentUser }) => {
    return {
      variables: {
        user_id: currentUser.user_id,
      },
    }
  },
  props: ({ data: { cards, loading } }) => ({
    cards,
    loading,
  })
})

const StyledButtonContainer = styled.div`
  width: 50%;
  margin: 60px auto 10px auto;
`;

const StyledTabContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default compose(
  withRouter,
  withCurrentUser,
  withGetCardList,
)(App);
