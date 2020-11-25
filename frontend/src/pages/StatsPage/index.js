import React from 'react';
import Header from '../../components/Header';
import {Container} from 'react-bootstrap';
import ShortenerService from '../../services/shortenerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styles';

class StatsPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            shortenerURL: {},
            errorMessage: ''
        }

    }

    render(){

        const {errorMessage, shortenerURL} = this.state;

        return (
            <Container>
                <Header>Estatísticas</Header>
                {errorMessage ? (
                    <StatsContainer>
                        <FontAwesomeIcon sice="3x" color="#f8d7da" icon="{exclamation-triangle}" />
                        <p className="mb-3">{errorMessage}</p>
                        <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer>
                ) : (
                    <p>Resultado</p>
                )}
            </Container>
        )
    }

}

export default StatsPage;
