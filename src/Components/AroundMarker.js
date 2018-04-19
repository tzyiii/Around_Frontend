import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';


export class AroundMarker extends React.Component {
    state = {
        isOpen: false,
    }
    onToggleOpen = () => {
        this.setState((prevState) => ({isOpen: !prevState.isOpen}));
    }

    render() {
        const post =this.props.post;
        const {locattion, user, message} = post;
        const {lat, lon} = locattion;
        return (
            <Marker
                position = {{lat: lat, lng : lon}}
                onMouseOver = {this.onToggleOpen}
                onMouseOut = {this.onToggleOpen}
            >
                {this.state.isOpen ?
                    <InfoWindow onCloseClick={this.onToggleOpen}>
                        <div>
                            <img className= "around-marker-image" src = {this.props.post.url} alt= "image"/>
                            <p>{`${this.props.post.user}`}</p>
                        </div>
                    </InfoWindow> : null}
            </Marker>
        );
    }
}
