/**
 * A page to display the route information for each route.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import {
  Table,
  Row,
  Rows,
} from 'react-native-table-component';

class TimeLabel extends Component {
  render() {
    return (
        <View style={styles.time}>
          <Text style={{color: '#555555'}}>{this.props.days}</Text>
          <Text>{this.props.time}</Text>
        </View>
    );
  }
}

export default class RouteInformation extends Component {
  static navigationOptions = {
    tabBarLabel: 'Route Information',
  };

  constructor(props) {
    super(props);
    this.state = {};

    // How long it takes the bus to the next stop, at each stop.
    this.state.delays = [
      0, 1, 1, 3, 1, 1, 2, 3, 1, 1, 1, 1, 1, 1, 4, 3
    ];
    this.state.start_times = [0, 15, 30, 45];

    // TODO: Ideally this all should go in a resource file.
    this.state.campusData = [
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
    ];

    this.state.spartan_village = [
      'Glenwood Street',
      'Kaplan Wellness Center',
      'Spartan Villiage',
      'Lot 7',
      'Walker Circle',
      'Visitor\'s Center'
    ];

    this.state.sv_change_times = [
      0, 1, 1, 2, 4, 3
    ];
  }

  componentDidMount() {
    let cols = [];

    // A bit messy but we are basically just trying to compute the table of when the
    // bus is expected to reach each stop in its route.
    let headers = ['Stop Name', 'Bus A', 'Bus B', 'Bus A', 'Bus B'];
    let times = [...this.state.start_times];
    for (let i = 0; i < this.state.delays.length; i++) {
      let delay = this.state.delays[i];
      times[0] += delay;
      times[1] += delay;
      times[2] += delay;
      times[3] += delay;
      if (times[3] >= 60) times[3] -= 60;
      cols.push([
        this.state.campusData[i],
        `:${times[0]}`,
        `:${times[1]}`,
        `:${times[2]}`,
        `:${times[3]}`
      ]);
    }

    // Same thing as above but now for Spartan Village.
    times = [...this.state.start_times];
    let sv_cols = [];
    let sv_headers = ["Stop", "Bus"];
    for (let i = 0; i < this.state.sv_change_times.length; i++) {
      let delay = this.state.sv_change_times[i];
      times[0] += delay;
      times[1] += delay;
      times[2] += delay;
      times[3] += delay;
      sv_cols.push([
        this.state.spartan_village[i],
        `:${times[0]}`,
        `:${times[1]}`,
        `:${times[2]}`,
        `:${times[3]}`
      ]);
    }

    this.setState({
      campusLoopCols: cols,
      campusLoopHeader: headers,
      sv_header: sv_headers,
      sv_cols: sv_cols
    });

  }


  render() {
    return (
        <ScrollView style={styles.containerStyle} contentContainerStyle={styles.container} bounces={true}>
          <Text style={styles.title}>Campus Loop</Text>
          <View style={styles.time_container}>
            <TimeLabel days="Monday-Wednesday" time="7:30am-1:30am"/>
            <TimeLabel days="Thursday-Friday" time="7:30am-2:30am"/>
            <TimeLabel days="Saturday" time="5:30pm-2:30am"/>
            <TimeLabel days="Sunday" time="3:30pm-1:30am"/>
          </View>
          <Table style={styles.table} borderStyle={{borderWidth: 0.1, borderColor: '#b0b0b0'}}>
            <Row data={this.state.campusLoopHeader} flexArr={[3, 1, 1, 1, 1]} style={styles.head}
                 textStyle={styles.headText}/>
            <Rows data={this.state.campusLoopCols} flexArr={[3, 1, 1, 1, 1]} style={styles.row}
                  textStyle={styles.text}/>
          </Table>
          <Text style={styles.title}>Spartan Villiage Express</Text>
          <View style={styles.time_container}>
            <TimeLabel days="Monday-Friday"
                       time="7:30am-10:30pm"/>
            <TimeLabel days="Saturday-Sunday"
                       time="11:00am-6:00pm"/>
          </View>
          <Table style={styles.table} borderStyle={{borderWidth: 0.1, borderColor: '#b0b0b0'}}>
            <Row data={this.state.sv_header} flexArr={[3, 4]} style={styles.head} textStyle={styles.headText}/>
            <Rows data={this.state.sv_cols} flexArr={[3, 1, 1, 1, 1]} style={styles.row} textStyle={styles.text}/>
          </Table>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    backgroundColor: '#e9edf1',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  sub_title: {
    color: '#555555',
  },
  bottom_bar: {
    backgroundColor: '#FAF7F4',
    alignSelf: 'stretch',
  },
  time_container: {
    width: 400,
    justifyContent: 'center',
    alignSelf: 'center',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row'

  },
  time: {
    width: 150,
    margin: 3,
    alignItems: 'center',
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
  table: {
    width: 330,
    margin: 30,
    backgroundColor: 'white'
  },
  border: {
    borderColor: '#888888',
  },
  row: {
    height: 50,
  },
  head: {
    height: 50,
    backgroundColor: '#2196f3', // 2196f3
  },
  headText: {
    color: 'white',
    textAlign: 'center',
  },
  text: {textAlign: 'center'}
});

