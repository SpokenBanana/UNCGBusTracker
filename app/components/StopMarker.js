import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

import MapView from 'react-native-maps';
import Stop from './Stop';

export default class StopMarker extends Component {
  constructor(props) {
    super(props);

    let chariotStopInfo = [
      ['Glenwood Street', 36.062643, -79.810533, 5, ''],
      ['Kaplan Wellness Center', 36.062524, -79.812950, 5, ''],
      ['Spartan Villiage', 36.062333, -79.807597, 5, ''],
      ['Lot 1', 36.063825, -79.814705, 5, ''],
      ['Kenilworth Street', 36.064788, -79.812575, 5, ''],
      ['Spring Garden Apartments', 36.065707, -79.813712, 5, ''],
      ['Lot 9 at Stadium', 36.067008, -79.814442, 5, ''],
      ['Walker Avenue Circle', 36.068257, -79.810660, 5, ''],
      ['Moore-Strong', 36.072203, -79.810429, 5, ''],
      ['West Drive', 36.070811, -79.810488, 5, ''],
      ['Fountain', 36.069957, -79.810450, 5, ''],
      ['College Avenue', 36.070681, -79.808310, 5, ''],
      ['Sullivan Science', 36.070338, -79.806835, 5, ''],
      ['119 McIver Street', 36.071973, -79.806610, 5, ''],
      ['Tate Street', 36.067654, -79.805650, 5, ''],
      ['Lot 7 at Gatewood', 36.065057, -79.807082, 5, '']
    ];

    let svExpressStopInfo = [
      ['Glenwood Street', 36.061235, -79.810544, 1, ''], //Glenwood Street
      ['Kaplan Wellness Center', 36.061634, -79.811815, 1, ''], //Kaplan Wellness Center
      ['Spartan Villiage', 36.062366, -79.807599, 1, ''], //Spartan Village
      ['Lot 7 at Gatewood', 36.065026, -79.807100, 1, ''], //Lot 7
      ['Walker Ave Circle', 36.068306, -79.810670, 1, ''], //Walker Circle
      ['Visitor\'s Center', 36.065375, -79.813081, 1, ''] //Visitor's Center
    ];

    let chariotStops = [];
    for (let stop of chariotStopInfo) {
      chariotStops.push(new Stop({
        name: stop[0],
        lat: stop[1],
        lng: stop[2],
        description: stop[4]
      }));
    }

    this.state = {
      campusLoopOrder: [
        'Glenwood Street',
        'Kaplan Wellness Center',
        'Spartan Villiage',
        'Lot 1',
        'Kenilworth Street',
        'Spring Garden Apps',
        'Lot 9 at Stadium',
        'Walker Ave Circle',
        'Moore-Strong',
        'West Drive',
        'Fountain',
        'College Ave',
        'Sullivan Science',
        '119 McIver Street',
        'Tate Street',
        'Lot 7 at Gatewood'
      ],
      campusLoopDelays: [
        0, 1, 1, 3, 1, 1, 2, 3, 1, 1, 1, 1, 1, 1, 4, 3
      ],
      svOrder: [
        'Glenwood Street',
        'Kaplan Wellness Center',
        'Spartan Villiage',
        'Lot 7 at Gatewood',
        'Walker Ave Circle',
        'Visitor\'s Center'
      ],
      svDelays:  [
        0, 1, 1, 2, 4, 3
      ],
      chariotStops: [
        ['Glenwood Street', 36.062643, -79.810533, 5, ''],
        ['Kaplan Wellness Center', 36.062524, -79.812950, 5, ''],
        ['Spartan Villiage', 36.062333, -79.807597, 5, ''],
        ['Lot 1', 36.063825, -79.814705, 5, ''],
        ['Kenilworth Street', 36.064788, -79.812575, 5, ''],
        ['Spring Garden Apartments', 36.065707, -79.813712, 5, ''],
        ['Lot 9 at Stadium', 36.067008, -79.814442, 5, ''],
        ['Walker Avenue Circle', 36.068257, -79.810660, 5, ''],
        ['Moore-Strong', 36.072203, -79.810429, 5, ''],
        ['West Drive', 36.070811, -79.810488, 5, ''],
        ['Fountain', 36.069957, -79.810450, 5, ''],
        ['College Avenue', 36.070681, -79.808310, 5, ''],
        ['Sullivan Science', 36.070338, -79.806835, 5, ''],
        ['119 McIver Street', 36.071973, -79.806610, 5, ''],
        ['Tate Street', 36.067654, -79.805650, 5, ''],
        ['Lot 7 at Gatewood', 36.065057, -79.807082, 5, '']
      ],

      svExpressStops: [
        ['Glenwood Street', 36.061235, -79.810544, 1, ''], //Glenwood Street
        ['Kaplan Wellness Center', 36.061634, -79.811815, 1, ''], //Kaplan Wellness Center
        ['Spartan Villiage', 36.062366, -79.807599, 1, ''], //Spartan Village
        ['Lot 7 at Gatewood', 36.065026, -79.807100, 1, ''], //Lot 7
        ['Walker Ave Circle', 36.068306, -79.810670, 1, ''], //Walker Circle
        ['Visitor\'s Center', 36.065375, -79.813081, 1, ''] //Visitor's Center

      ],

      parkAndRideStops: [
        ['Park and Ride Stop 1', 36.061733, -79.818585, 2],
        ['Park and Ride Stop 2', 36.061275, -79.821826, 2],
        ['Park and Ride Stop 3', 36.065475, -79.811977, 2],
        ['Park and Ride Stop 4', 36.066288, -79.806581, 2],
      ],

      chariot: require('../../images/chariot.png'),
      parkandride: require('../../images/park.png'),
      sv: require('../../images/spartan.png')
    };
    this.state.currentDelays = new Map(this.state.campusLoopOrder.map((stop) => [stop, 100]));
  }

  relaxFrom(stopName, initDelay, routeOrder, routeDelays, groupName) {
    let index = routeOrder.indexOf(stopName);
    let currentDelays = this.state.currentDelays;
    let delay = initDelay;

    let stops;
    if (groupName === 'Campus Loop') {
      stops = [...this.state.chariotStops];
    }
    else if (groupName === 'Spartan Village Express') {
      stops = [...this.state.svExpressStops];
    }

    currentDelays.set(routeOrder[index],
        Math.min(currentDelays.get(this.state.campusLoopOrder[index]), delay));
    stops[index][4] = `Next bus coming in approx. ${delay} mins.`;

    for (let i = (index + 1) % routeOrder.length; i !== index; i = (i + 1) % routeOrder.length) {
      currentDelays.set(routeOrder[i],
          Math.min(currentDelays.get(this.state.campusLoopOrder[i]), delay));
      delay += routeDelays[i];

      stops[i][4] = `Next bus coming in approx. ${currentDelays.get(routeOrder[i])} mins.`;
    }

    if (groupName === 'Campus Loop') {
      this.setState({chariotStops: stops});
    }
    else if (groupName === 'Spartan Village Express') {
      this.setState({svExpressStops: stops});
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.busStopInfo.size === 0) {
      for (let stop of this.state.chariotStops) {
        stop[4] = 'No incoming bus.';
      }
      for (let stop of this.state.svExpressStops) {
        stop[4] = 'No incoming bus.';
      }
    }

    for (let [key, value] of newProps.busStopInfo) {
      let routeOrder, routeDelays;
      if (value.groupName === 'Campus Loop') {
        routeOrder = this.state.campusLoopOrder;
        routeDelays = this.state.campusLoopDelays;
      }
      else if (value.groupName === 'Spartan Village Express') {
        routeOrder = this.state.svOrder;
        routeDelays = this.state.svDelays;
      }

      this.relaxFrom(key, value.time, routeOrder, routeDelays, value.groupName);
    }
  }

  render() {
    return (
        <View>
          {this.state.chariotStops.map((marker) => {
            let icon = this.state.chariot;
            return (
                <MapView.Marker
                    coordinate={{latitude: marker[1], longitude: marker[2]}}
                    key={marker[0]}
                    title={marker[0]}
                    description={marker[4]}>
                  <Image
                      source={icon}
                      style={styles.map_icon}
                      onLayout={() => marker[3] = 10}
                      key={`${marker[0] + marker[3]}`}
                  />
                </MapView.Marker>
            );
          })}

          {this.state.parkAndRideStops.map((marker) => {
            let icon = this.state.parkandride;
            return (
                <MapView.Marker
                    coordinate={{latitude: marker[1], longitude: marker[2]}}
                    key={marker[0]}
                    title={marker[0]}>
                  <Image
                      source={icon}
                      style={styles.map_icon}
                      onLayout={() => marker[3] = 10}
                      key={`${marker[0] + marker[3]}`}
                  />
                </MapView.Marker>
            );
          })}

          {this.state.svExpressStops.map(marker => {
            let icon = this.state.sv;
            return (
                <MapView.Marker
                    coordinate={{latitude: marker[1], longitude: marker[2]}}
                    key={marker[0]}
                    title={marker[0]}
                    description={marker[4]}>
                  <Image
                      source={icon}
                      style={styles.map_icon}
                      onLayout={() => marker[3] = 10}
                      key={`${marker[0] + marker[3]}`}
                  />
                </MapView.Marker>
            );
          })}
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
  map_icon: {
    width: 20,
    height: 20,
  },
  bus_icon: {
    width: 20,
    height: 20,
  }
});

