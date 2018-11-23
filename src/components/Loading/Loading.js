import React from 'react';
import styles from './Loading.css';


const Loading = (props) => {
    return (
        <div className={styles.artboard}>
            <div className={styles.domino}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <br/>
                Loading...
                <br/>
                {props.legend}
            </div>
        </div>
    );
}

export default Loading
