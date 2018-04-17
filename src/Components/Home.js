import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import {GEO_OPTIONS, POS_KEY, AUTH_PREFIX, API_ROOT, TOKEN_KEY} from '../constants.js';
import $ from 'jquery';

const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {
    state = {
        post:[],
        error: '',
        loadingPost: false,
        loadingGeoLocation: false,
    }

    componentDidMount() {
        if ("geolocation" in navigator) {
            this.setState({loadingGeoLocation:true, error : ''});
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS,
            );
        } else {
            this.setState({error : 'Can not get your location'});
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        this.setState({loadingGeoLocation: false, error : ''});
        const{ latitude : lat, longitude : lon } = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({ lat:lat, lon:lon }));
        this.loadNearByPost();
    }

    onFailedLoadGeoLocation = (error) => {
        this.setState({loadingGeoLocation: false, error : 'Failed to get geolocation'});
    }

    getGalleryContent = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        }
        if (this.state.loadingGeoLocation) {
            return <Spin tip = 'Loading your location...'/>
        }
        if (this.state.loadingPost) {
            return <Spin tip = 'Loading post...'/>
        }
        return null;
    }

    loadNearByPost = () => {
        //const{lat, lon}  = JSON.parse(localStorage.getItem(POS_KEY));
        const lat = 37.7915953;
        const lon = -122.3937977;
        this.setState({loadingPost: true});
        $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20`,
            method: 'GET',
            headers :{
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
            }

        }).then((response) => {
            this.setState({loadingPost: false});
            console.log(response);
            this.setState({post : response});
        }, (error) => {
            this.setState({error : error.responseText});
        }).catch((error) => {
            this.setState({error : error});
        })
    }


    render() {
        return (
            <Tabs tabBarExtraContent={operations} className = "main-tabs">
                <TabPane tab="Posts" key="1">{this.getGalleryContent()}</TabPane>
                <TabPane tab="Map" key="2">Content of tab 2</TabPane>
            </Tabs>
        );
    }
}
