import React, {Component} from 'react';
import loadGoogleMapsAPI from 'load-google-maps-api';
import * as Map from './constants';
import styles from './Map.css';
import Proptypes from 'prop-types';

const mapOptions = {
    center: Map.COORDINATES,
    zoom: 10,
    mapTypeControlOptions: {
        mapTypeIds: ['Retro']
    }
};

const markerOptions = (googleMaps, map) => {
    return {
        position: Map.COORDINATES,
        map: map,
        title: 'Residencia Ergos',
        animation: googleMaps.Animation.BOUNCE
    }
};

export default class CityMap extends Component {

componentWillUpdate
    markers = [];
    GeoCoder;
    MapInstance;
    GoogleMapsRef;
    timeOuts = [];
    storesLocation = [];

    currentStoreLoading;
    jarOfPromisesLen;

    updateDataForMap(listStores) {

        const jarOfPromises = listStores.map((store, index) =>
            () => new Promise((resolve, reject) => {

                const storeFound = this.storesLocation.find(storeLoc => storeLoc.storeId === store.id)

                if (storeFound) {
                    resolve(null);
                    return;
                }
                const timeRef = setTimeout(() => {

                    this.currentStoreLoading = store.Name;
                    this.props.loadingItem(this.currentStoreLoading);

                    this.GeoCoder.geocode({'address': store.Address},
                        (results, status) => {
                            if (status === 'OK') {

                                const storeLocation = {
                                    storeId: store.id,
                                    name: store.Name,
                                    geoData: {
                                        lng: results[0].geometry.location.lng(),
                                        lat: results[0].geometry.location.lat(),
                                    }
                                }

                                this.storesLocation.push(storeLocation)

                                resolve(storeLocation);
                            } else {
                                console.log('results => ', status)
                                reject(status);
                            }
                        })
                }, 150 * index - 50);

                this.timeOuts.push(timeRef);

            })
        );

        this.jarOfPromisesLen = jarOfPromises.length;

        jarOfPromises.reduce((promiseChain, currentTask, index) => {

            return promiseChain.then(() => {
                return currentTask().then(
                    (storeLocation) => {

                        if (!storeLocation) {
                            return;
                        }

                        const marker = new this.GoogleMapsRef.Marker({
                            position: storeLocation.geoData,
                            map: this.MapInstance,
                            storeId: storeLocation.storeId,
                            callBack: this.clickCallback
                        });

                        marker.addListener('click', function () {
                            this.callBack(this.storeId);
                        });

                        this.markers.push(marker);

                        if(index === this.jarOfPromisesLen - 1 ){
                            this.props.loadingItem('');
                        }

                    }
                ).catch( err => {
                    if(index === this.jarOfPromisesLen - 1 ){
                        this.props.loadingItem('');
                    }
                });
            });

        }, Promise.resolve([])).then(() => {

            const bounds = new this.GoogleMapsRef.LatLngBounds();

            this.markers.forEach(marker => {
                bounds.extend(marker.position);
            })

            this.MapInstance.fitBounds(bounds);

        });
    }


    clickCallback = (marker) => {
        this.props.markerClick(marker);
    }



    componentDidUpdate() {

        this.timeOuts.forEach(time => {
            clearTimeout(time);
        });

        setTimeout(() => this.updateDataForMap(this.props.listStores), 200);

    }

    componentDidMount() {

        loadGoogleMapsAPI(Map.API_CONFIG).then(googleMaps => {


            this.GoogleMapsRef = googleMaps;
            this.GeoCoder = new googleMaps.Geocoder();
            this.MapInstance = new googleMaps.Map(this.refs.map, mapOptions);

            const newStyleMap = new googleMaps.StyledMapType(Map.STYLES, {name: 'Retro'});
            this.MapInstance.mapTypes.set('Retro', newStyleMap);
            this.MapInstance.setMapTypeId('Retro');


            this.updateDataForMap(this.props.listStores)


        }).catch(err => {
            console.log('Something went wrong loading the map', err);
        });
    }

    render() {

        console.log('Inside Render ==> ');

        return (
            <div ref="map" id="map_canvas" className={[styles.mapgoogle, styles.mapcanvas].join(' ')}></div>
        )
    }
}

CityMap.propTypes = {
    listStores: Proptypes.array
}
