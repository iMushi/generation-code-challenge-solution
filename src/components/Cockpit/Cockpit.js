import React, {Component} from 'react';
import Map from '../Map/Map';
import Loading from '../Loading/Loading';
import {Col, Row} from 'reactstrap';
import styles from './Cockpit.css';
import Storelist from '../StoreList/Storelist';
import Favorites from '../Favorites/Favorites';

class Cockpit extends Component {

    CityMap;

    state = {
        favorites: [],
        loadingLegend: ''
    }


    addFavoriteClick = (favoriteId) => {

        const favStore = this.props.listStores.slice().find(store => store.id === favoriteId);
        const favorites = this.state.favorites.slice();

        if (!favorites.find(store => store.id === favStore.id)) {
            favorites.push(favStore);
            this.setState({
                favorites: favorites
            });
        }

    }

    removeFavorite = (favoriteId) => {
        const favoriteIndex = this.state.favorites.findIndex(store => store.id === favoriteId);

        const favorites = [...this.state.favorites];
        favorites.splice(favoriteIndex, 1);

        this.setState({
            favorites: favorites
        });
    }

    updateLoadingLegend = (legend) => {

        this.setState({

            loadingLegend: legend
        })

    }

    render() {

        // console.log('Cockpit Render ===>');

        this.CityMap = this.props.listStoresToRender.length ?
            <Map
                listStores={this.props.listStoresToRender}
                loadingItem={this.updateLoadingLegend}
                markerClick={this.addFavoriteClick}
            /> : <Loading/>

        return (
            <div>
                <Row>
                    <Col xs="12" md="6" lg="6" sm="12">
                        <div className={styles["contact-map"]}>
                            <Storelist
                                listStores={this.props.listStores}
                                scrollDiv={this.props.scroll}
                            />
                        </div>
                    </Col>
                    <Col xs="12" md="6" lg="6" sm="12">
                        {this.state.loadingLegend !== '' ?
                            <Loading legend={this.state.loadingLegend}/> : null
                        }
                        <div className={styles["contact-map"]}>
                            {this.CityMap}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="12" lg="12" sm="12">
                        <div className={styles["contact-map"]}>
                            <Favorites favoriteStores={this.state.favorites} click={this.removeFavorite}></Favorites>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default Cockpit;
