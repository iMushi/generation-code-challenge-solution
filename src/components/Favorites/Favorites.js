import React from 'react';
import {Col, Row, ListGroup, ListGroupItem} from 'reactstrap';
import styles from './Favorites.css';

const Favorites = (props) => {


    return (
        <div>
            <Row>
                <Col xs="12" sm="12" md="12" lg="12">
                    <h3 className={styles.title}>Your Favorite Stores</h3>
                </Col>
            </Row>
            <div className={styles.listOfStores}>
                <ListGroup>
                {props.favoriteStores.map(store =>
                    <ListGroupItem key={store.id} className={styles.hoverGroup} onClick={()=>props.click(store.id)}>
                        <span className={styles.storeTitle}>{store.Name} </span>
                        <br/>{store.Address}
                    </ListGroupItem>)
                }
                </ListGroup>
            </div>
        </div>
    );

}

export default Favorites;

