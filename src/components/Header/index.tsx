import logo from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface HeaderProps
{
    //está variável é do tipo função que não
    //recebe nada e não retorna nada
    onOpenNewTransactionModal: () => void;
}

export function Header({onOpenNewTransactionModal}:HeaderProps)
{
  

    return (
        <Container>
            <Content>
                <img src={logo} alt="dt money" />
                <button type="button" 
                onClick={onOpenNewTransactionModal}>Nova transação</button>
            </Content>
        </Container>
    )
}