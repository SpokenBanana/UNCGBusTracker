import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import MapView from 'react-native-maps';
import BusApi from '../geo_lib/bus_api.js';
import StopMarker from '../components/StopMarker.js';
import RouteGraph, {getStopForChariot} from './../geo_lib/eta_engine.js';
import {ROUTE_MARKS, SV_ROUTE_MARKS} from './../geo_lib/route_constants.js';
import {SERVER, USER_NAME, DATABASE, PASSWORD} from './../geo_lib/credentials.js';

export function isInBounds(newLat, newLng) {
  return (newLat <= 36.074305) && (newLat >= 36.05937) && (newLng >= -79.825224) && (newLng <= -79.802605);
}

export default class BusTracker extends Component {
  static navigationOptions = {
    tabBarLabel: 'Live Tracking',
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      api: new BusApi(SERVER, USER_NAME, PASSWORD, DATABASE),
      busStopInfo: new Map(),
      userLocation: null,
      vehicles: new Map(),
      groups: new Map(),
      arrow: require('../../images/arrow.png'),
      chariot: require('../../images/chariotbus.png'),
      parkandride: require('../../images/parkandridebus.png'),
      spartanVillage: require('../../images/spartanvillagebus.png'),
      devices: new Map(),
    };

    this.state.campusLoopGraph = new RouteGraph(ROUTE_MARKS);
    this.state.svLoopGraph = new RouteGraph(SV_ROUTE_MARKS);

    this._interval = setInterval(() => {
      if (!this.state.loading) {
        this.updateBuses();
        navigator.geolocation.getCurrentPosition(position => {
          this.setState({userLocation: position.coords});
        });
      }
    }, 2500);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState(prev => {
        prev.userLocation = position.coords;
        return prev;
      })
    });

    let groups = new Map();
    let devices = new Map();
    let vehicles = new Map();

    this.state.api.getGroups().then((result) => {
      for (let group of result) {
        groups.set(group.id, group.name);
      }
    }).then(() => {
      return this.state.api.getVehicles();
    }).then((result) => {
      for (let device of result) {
        devices.set(device.id, device.name);
      }
    }).then(() => {
      return this.state.api.getVehicleInfo();
    }).then((result) => {
      for (let bus of result) {
        let groupName = groups.get(bus.groups[0].id);

        groupName = groups.get(bus.groups[0].id);
        let description;
        if (groupName === "Park and Ride") {
          description = 'No posted route info - No ETA (sorry!)';
        } else {
          description = '';
        }

        vehicles.set(bus.device.id, {
          id: bus.device.id,
          notMovedFor: 0,
          next: 'Glenwood Street', // Default.
          heading: bus.bearing,
          groupname: groupName,
          lat: bus.latitude,
          lng: bus.longitude,
          latlng: new MapView.AnimatedRegion({
            latitude: bus.latitude,
            longitude: bus.longitude
          }),
          active: isInBounds(bus.latitude, bus.longitude),
          description: description,
          title: groupName + ' - ' + devices.get(bus.device.id)
        });

        this.setState(prev => {
          prev.loading = false;
          prev.vehicles = vehicles;
          prev.devices = devices;
          prev.groups = groups;
          return prev;
        });
      }
    });

  }

  updateBuses() {
    console.log('starting request.');
    let api = this.state.api;
    let vehicles = this.state.vehicles;
    let updatedBusInfo = new Map();
    api.getVehicleInfo().then((result) => {
          for (let bus of result) {
            let updated = vehicles.get(bus.device.id);

            updated.active = isInBounds(bus.latitude, bus.longitude);
            if (!updated.active) {
              vehicles.set(bus.device.id, updated);
              continue;
            }

            // Update location.
            updated.latlng.timing({
              latitude: bus.latitude,
              longitude: bus.longitude,
            }, 1500).start();
            updated.lat = bus.latitude;
            updated.lng = bus.longitude;
            updated.heading = bus.bearing;

            // Update next stop.
            let route_marks = null;
            if (updated.groupname === "Campus Loop") {
              route_marks = ROUTE_MARKS;
            } else if (updated.groupname === 'Spartan Village Express') {
              route_marks = SV_ROUTE_MARKS;
            }

            if (route_marks !== null) {
              let stop = getStopForChariot(bus, route_marks);
              if (stop === null) {
                updated.description = '';
              } else {
                updated.description = stop.message;
                updatedBusInfo.set(stop.stopName, {
                  id: updated.id,
                  time: stop.time,
                  groupName: updated.groupname
                });
              }
            }

            vehicles.set(bus.device.id, updated);
          }
          this.setState({vehicles: vehicles, busStopInfo: updatedBusInfo});
        }
    )
    ;
  }

  render() {
    let loading_message = this.state.vehicles.size === 0 ? "Loading..." : "";
    return (
        <View style={styles.container}>
          <MapView
              showsUserLocation={true}
              showsMyLocationButton={true}
              style={styles.map}
              initialRegion={{
                latitude: 36.0664528,
                longitude: -79.8101501,
                latitudeDelta: 0.0152, // 0222
                longitudeDelta: 0.0047, // 0021
              }}>
            {Array.from(this.state.vehicles.values()).map((marker) => {
              let icon = this.state.arrow;
              if (marker.groupname === 'Campus Loop')
                icon = this.state.chariot;
              else if (marker.groupname === 'Park and Ride')
                icon = this.state.parkandride;
              else if (marker.groupname === 'Spartan Village Express')
                icon = this.state.spartanVillage;
              if (marker.active) return (
                  <MapView.Marker.Animated
                      coordinate={marker.latlng}
                      key={marker.id}
                      title={marker.title}
                      description={marker.description}>
                    <Image
                        heading={marker.heading}
                        source={icon}
                        style={{width: 20, height: 20, transform: [{rotate: `${marker.heading}deg`}]}}
                    />
                  </MapView.Marker.Animated>
              )
            })}
            <StopMarker busStopInfo={this.state.busStopInfo}/>
          </MapView>

          <View style={styles.bottom_bar}>
            <Text style={styles.welcome}>
              {loading_message}
            </Text>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bottom_bar: {
    backgroundColor: '#FAF7F4',
    alignSelf: 'stretch',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  map_icon: {
    width: 20,
    height: 20,
  },
  bus_icon: {
    width: 20,
    height: 20,
  }
});
