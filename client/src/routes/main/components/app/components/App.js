import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import { GET_ALL_CARDS_QUERY, GET_CURRENT_USER } from 'queries';
import { Button, Loader, Footer } from 'components';
import styled from 'styled-components';
import Modal from 'react-modal';
import FlipCardList from './FlipCardList';
import CardList from './CardList';
import Tab from './Tab';
import AddCard from './CardModal';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%'
  }
};

const App = ({ cards, loading, history, currentUser }) => {
  const [mode, setMode] = useState('list'); // either list or study
  const [tabFilter, setTabFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('ADD_CARD');
  const [editData, setEditData] = useState({});
  const [initialIndex, setInitialIndex] = useState(1);

  if (loading) {
    return <Loader />;
  }

  function countTotalNumberOfField(field) {
    return cards.reduce((count, a) => a[field] ? count + 1 : count, 0);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function openIndividualCard(index) {
    setInitialIndex(index)
    setMode('study')
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
            setInitialIndex={openIndividualCard}
          />
        </Fragment>
      );
    }

    return (
      <FlipCardList
        cards={cards}
        currentUser={currentUser}
        toggleUpdateCard={openModal}
        setEditData={setEditData}
        setModalMode={setModalMode}
        initialIndex={initialIndex}
        setInitialIndex={setInitialIndex}
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
        isHide={mode === 'study'}
        openAddCard={() => {
          openModal();
          setModalMode('ADD_CARD');
        }}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={modalStyles}
        contentLabel="CARD_MODAL"
      >
        <AddCard
          mode={modalMode}
          editData={editData}
          closeModal={closeModal}
        />
      </Modal>
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
