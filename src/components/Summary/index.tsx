import { Container } from './styles';
import incomimgImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import total from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary()
{
    const {transactions} = useTransactions();

    const summary = transactions.reduce((acc, transaction) => 
    {
        if(transaction.type == 'deposit')
        {
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        }
        else
        {
            acc.withdraw += transaction.amount;  
            acc.total -= transaction.amount; 
        }

        return acc;
    }, 
    {
        deposits: 0,
        withdraw: 0,
        total:0,
    })

    return(

        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomimgImg} alt="Entradas" />
                </header>
                <strong> 
                        {
                            new Intl.NumberFormat('pt-BR',
                            {
                                style:'currency',
                                currency: 'BRL'
                            }).format(summary.deposits)
                        }
                </strong>
            </div>
            <div>
                <header>
                    <p>Saída</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>
                    -
                    {
                        new Intl.NumberFormat('pt-BR',
                        {
                            style:'currency',
                            currency: 'BRL'
                        }).format(summary.withdraw)
                    }
                </strong>
            </div>
            <div className="highlighted-background">
                <header>
                    <p>Entradas</p>
                    <img src={total} alt="Total" />
                </header>
                <strong>
                    {
                        new Intl.NumberFormat('pt-BR',
                        {
                            style:'currency',
                            currency: 'BRL'
                        }).format(summary.total)
                    }
                </strong>
            </div>
        </Container>    
    );
}