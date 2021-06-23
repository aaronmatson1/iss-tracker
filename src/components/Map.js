import React from 'react';

import GoogleMapReact from 'google-map-react';

const ISS_URL = "http://api.open-notify.org/iss-now.json"
const MAP_KEY = process.env.REACT_APP_MAP_KEY
const img = <img src = "./iss.png" alt = "iss" height = "30px"/>

const SpaceStation = ({ img }) => <div>{img}</div>

class Map extends React.Component{
    state = {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 1
    }

    componentDidMount(){
        this.getCoordinates()
        this.interval = setInterval(this.getCoordinates, 5000)
    }
    
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    
    getCoordinates = () => {
        fetch(ISS_URL)
            .then(res => res.json())
            .then(data => this.setState({
                center: {
                    lat: data.iss_position.latitude,
                    lng: data.iss_position.longitude
                }
            }))
    }
    
    render(){
        return(
            <div>
                <p>Latitude: {this.state.center.lat}</p>
                <p>Longitude: {this.state.center.lng}</p>
                <div className = "map" style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact className = "map"
                        bootstrapURLKeys={{key: MAP_KEY }}
                        center={this.state.center}
                        zoom={this.state.zoom}
                    >
                    <SpaceStation

                        lat = {this.state.center.lat}
                        lng = {this.state.center.lng}
                        img = {img}
                    />
                    </GoogleMapReact>
                </div>
            </div>
        )
    }
}

export default Map;