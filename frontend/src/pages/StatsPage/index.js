import React from 'react';
import Header from '../../components/Header';
import {Container} from 'react-bootstrap';
import ShortenerService from '../../services/shortenerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styles';
import {parseISO, formatRelative} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

class StatsPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            shortenedURL: {},
            errorMessage: ''
        }
    }

    async componentDidMount() {

        const { code } = this.props.match.params;
        
        try {

            const service = new ShortenerService();
            const shortenedURL = await service.getStats(code);

            const parsedDate = parseISO(shortenedURL.updatedAt);
            const currentDate = new Date();
            
            const relativeDate = formatRelative(parsedDate, currentDate, {
                locale: ptBR,
            });

            shortenedURL.relativeDate = relativeDate;

            this.setState({ isLoading: false, shortenedURL: shortenedURL, errorMessage: '' });

        } catch(e) {
            //console.log( e );
            this.setState({ isLoading: false, errorMessage: 'Ops a URL não existe. Tente novamente mais tarde :(' });
        }

    }

    render(){

        const {errorMessage, shortenedURL} = this.state;

        return (
            <Container>
                <Header>Estatísticas</Header>
                {errorMessage ? (
                    <StatsContainer className="text-center">
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                        <p className="mb-3 mt-1">{errorMessage}</p>
                        <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer>
                ) : (
                    <StatsContainer className="text-center">
                        <p><strong>http://pitu.io/{shortenedURL.code}</strong></p>
                        <p>Redireciona para: <br/>{shortenedURL.url}</p>
                        <StatsRow>
                            <StatsBox>
                                <b>{shortenedURL.hits}</b>
                                <StatsBoxTitle>Visitas</StatsBoxTitle>
                            </StatsBox>
                            <StatsBox>
                                <b>{shortenedURL.relativeDate}</b>
                                <StatsBoxTitle>Última visita</StatsBoxTitle>
                            </StatsBox>
                        </StatsRow>
                        <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer>
                )}
            </Container>
        )
    }

}

export default StatsPage;
