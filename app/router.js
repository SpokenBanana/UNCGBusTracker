/**
 * Just to handle all the navigation in one file. Not much
 * navigation going on here but it's still good practice.
 */
import React from 'react';

import BusTracker from './screens/BusTracker';
import RouteInformation from './screens/routeinfo';

import { TabNavigator } from 'react-navigation';

export const BusApp = TabNavigator({
  Main: {screen: BusTracker},
  Routes: {screen: RouteInformation},
});

export default BusApp;

