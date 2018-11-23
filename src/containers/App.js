import React, {Component} from 'react';
import styles from './App.css';
import axios from 'axios';
import Cockpit from '../components/Cockpit/Cockpit';
import {Col, Container, Jumbotron, Row} from 'reactstrap';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stores: [],
            favorites: [],
            storesToRender: []
        };

    }


    componentDidMount() {
        axios.get('./store_directory.json')
            .then(
                ({data: data = []}) => {
                    this.setState({
                        stores: data.map((x, index) => {
                            x.id = index;
                            return x;
                        })
                    });

                    this.setState({
                        storesToRender: this.state.stores.slice(0, 10)
                    });

                })
    }

    timeOutReference;

    listScrollHandler = (event) => {


        if (this.timeOutReference) {
            clearTimeout(this.timeOutReference);
        }
        let indexToBegin = Math.ceil(event.target.scrollTop / 22);

        this.timeOutReference = setTimeout(() => {
            this.setState({
                storesToRender: this.state.stores.slice(indexToBegin, indexToBegin + 10)
            });
        }, 800);


    }


    render() {
        return (
            <div className={styles.App}>
                <Container fluid>
                    <Jumbotron>
                        <Row>
                            <Col xs="12" md="12" lg="12" sm="12">
                                <h1 className={styles.title}> Welcome my fellow Students </h1>
                            </Col>
                        </Row>
                        <hr className="my-2"/>
                        <Cockpit
                            listStores={this.state.stores}
                            listStoresToRender={this.state.storesToRender}
                            scroll={this.listScrollHandler}/>
                    </Jumbotron>
                </Container>
            </div>
        );
    }
}

export default App;
