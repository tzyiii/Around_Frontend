import React from 'react';
import { Tabs, Button } from 'antd';
import {GEO_OPTIONS} from '../constants.js'

const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {
    componentDidMount() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLoacation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS,
            );
        } else {
            console.log("geolocation not supported");
        }
    }

    onSuccessLoadGeoLoacation = (position) => {
        console.log(position);
    }

    onFailedLoadGeoLocation = () => {

    }
    render() {
        return (
            <Tabs tabBarExtraContent={operations} className = "main-tabs">
                <TabPane tab="Posts" key="1">Content of tab 1</TabPane>
                <TabPane tab="Map" key="2">Content of tab 2</TabPane>
            </Tabs>
        );
    }
}
