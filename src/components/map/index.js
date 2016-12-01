import React, {Component, PropTypes} from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

export default class Map extends Component{

    constructor(props){
        super(props);
        this.current;
        this.map = this.map.bind(this);
        this.container = this.container.bind(this);
    }

    container(){
        return (
            <div style={{height: '100%', width: '100%'}}/>
        );
    }

    map(){
        return (
            <GoogleMap ref={(map) => this.current = map}
                       defaultZoom={5}
                       defaultCenter={{lat: 48.861984, lng: 13.154044}}
                       onClick={() => ({})}>

            </GoogleMap>
        );
    }

    render(){
        return (
            <section style={{height: '100%', width: '100%'}}>
                <GoogleMapLoader containerElement={this.container()}
                                 googleMapElement={this.map()}/>
            </section>
        );
    }
}
