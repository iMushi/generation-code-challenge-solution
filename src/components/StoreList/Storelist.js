import React from 'react';
import styles from './Storelist.css';
import {Row} from 'reactstrap';
import Aux from '../../hoc/Aux';


const StoreList = (props) => {

    return (
        <Aux>

            <Row>

                <h3> List of Available Stores </h3>
                <h6>Scroll List to load Locations on the Map...</h6>
                <div className={styles.listOfStores} onScroll={props.scrollDiv}>
                    <ul>
                        {
                            props.listStores.map(store =>
                                <li key={store.id}><a href="return">{store.Name}</a></li>
                            )
                        }
                    </ul>
                </div>
            </Row>
        </Aux>
    );

}


export default StoreList;
