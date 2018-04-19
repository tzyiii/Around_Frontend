import React from 'react';
import { POS_KEY } from '../constants';
import { AroundMarker } from './AroundMarker';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap
} from 'react-google-maps';

class AroundMap extends React.Component {
    reloadMarker = () => {
        const center = this.map.getCenter();
    }

    getMapRef = (map) => {
        this.map = map;
        window.thismap = map;
    }

    render() {
        const{lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        return (
            <GoogleMap
                defaultZoom = {11}
                defaultCenter = {{lat: lat, lng: lon}}
            >
                {this.props.posts ? this.props.posts.map((post) =>
                 <AroundMarker post={post} key ={post.url}/>
                ) : null}

            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));