import React, { useState } from 'react';
import styled from 'styled-components';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { GlobalStyle } from './styles/global';
import Modal from 'react-modal';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from '../src/hooks/useTransactions';

//questão de acessibilidade
Modal.setAppElement('#root');

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleRenderOpenNewTransactionModal()
  {
      setIsNewTransactionModalOpen(true);
  }

  function handleRenderCloseNewTransactionModal()
  {
      setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleRenderOpenNewTransactionModal}/>
      <Dashboard/>     
      <GlobalStyle/> 
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleRenderCloseNewTransactionModal} />
    </TransactionsProvider>
  );
}
