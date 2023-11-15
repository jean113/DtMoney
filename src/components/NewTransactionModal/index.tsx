import Modal from 'react-modal';
import { Container, RadioButton, TransactionTypeContainer } from './styles';
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps
{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps)
{
    const {createTransaction} = useTransactions();

    const [type, setType] = useState('deposit');
    
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');

    async function handleCreateNewTransaction(event:FormEvent)
    {
        event.preventDefault();

        await createTransaction({
           title,
           amount: value,
           category,
           type
        });

        setType('deposit');
        setTitle('');
        setValue(0);
        setCategory('');

        onRequestClose();
    }

    return (
        <Modal isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button" onClick={onRequestClose} className='react-modal-close'>
                <img src={closeImg} alt="Fechar modal"/>
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
                <input
                    placeholder='Titulo'
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input
                    type="number"
                    placeholder='Valor'
                    value={value}
                    onChange={event => setValue(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioButton type="button" 
                        activeColor={'green'} isActive={type === 'deposit'} onClick={() => {setType('deposit')}}>
                        <img src={incomeImg} alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioButton>

                    <RadioButton type="button" 
                        activeColor={'red'} isActive={type === 'withdraw'}  onClick={() => {setType('withdraw')}}>
                        <img src={outcomeImg} alt="Saída"/>
                        <span>Saída</span>
                    </RadioButton>
                </TransactionTypeContainer>

                <input
                    placeholder='Categoria'
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />
                <button type="submit">
                    Cadastrar
                </button>
            </Container>

        </Modal>
    );
}