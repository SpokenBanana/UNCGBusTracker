/**
 * Represents a stop icon marker on the map.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';

import MapView from 'react-native-maps';

class Stop extends Component {
  constructor(props) {
    super(props);

    // Meant to re-render icons once they are loaded by changing the key of the Image tag.
    this.state = {
      loaded: 0
    };
  }

  render() {
    return (
        <MapView.Marker
            coordinate={{latitude: this.props.lat, longitude: this.props.lng}}
            key={this.props.name}
            title={this.props.name}
            description={this.props.description}>
          <Image
              source={this.props.icon}
              style={styles.map_icon}
              onLayout={() => this.setState({loaded: 1})}
              key={`${this.name} + ${this.state.loaded}`}
          />
        </MapView.Marker>
    );
  }
}
const styles = StyleSheet.create({
  map_icon: {
    width: 20,
    height: 20,
  }
});


export default Stop;
