function distance(lat1, lon1, lat2, lon2) {
  let p = 0.017453292519943295;    // Math.PI / 180
  let c = Math.cos;
  let a = 0.5 -
      c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

export function getStopForChariot(position, routeMarks) {
  let dist = 10000000;
  let stop = '';
  let time = 0;

  // If distance is greater than 0.1 then it is too far.
  for (let mark of routeMarks) {
    let next_dist = distance(position.latitude, position.longitude, mark[0], mark[1]);
    if (next_dist < dist) {
      dist = next_dist;
      stop = mark[2];
      time = mark[3];
    }
  }

  // TODO: Instead of null consider using an enum or some other representation of empty.
  if (stop === '') return null;
  return {
    stopName: stop,
    time: time,
    message: `Arriving at ${stop} in approx. ${time} mins.`
  };
}


function isNearStop(position, routeMarks) {
  let dist = 10000000;
  let time = 0;

  // If distance is greater than 0.1 then it is too far.
  for (let mark of routeMarks) {
    let next_dist = distance(position.latitude, position.longitude, mark.lat, mark.lng);
    if (next_dist < dist) {
      dist = next_dist;
      time = mark.time;
    }
  }

  return {
    // TODO: Check if this distance makes sense.
    isNear: dist < .3,
    time: time,

    // For debug.
    dist: dist,
  };
}

class RouteNode {
  constructor(name, lat, lng) {
    this.name = name;
    this.lat = lat;
    this.lng = lng;
    this.marks = [];
    this.message = 'No incoming bus';
    this.next = '';
  }

  addMark(lat, lng, time) {
    this.marks.push({
      lat: lat,
      lng: lng,
      time: time
    });
  }
}

class RouteGraph {
  constructor(marks) {
    // Generate the graph from marks.
    this.nodes = new Map();
    let last = '';
    let current = '';

    // To complete the loop at the end.
    let first = marks[0][2];

    for (let mark of marks) {
      if (mark[2] !== current) {
        last = current;
        current = mark[2];
      }

      if (this.nodes.has(mark[2])) {
        let node = this.nodes.get(mark[2]);
        node.addMark(mark[0], mark[1], mark[3]);
        this.nodes.set(mark[2], node);
      } else {
        let node = new RouteNode(mark[2], mark[0], mark[1]);
        if (last !== '') {
          let prev = this.nodes.get(last);
          prev.next = current;
          this.nodes.set(last, prev);
        }
        this.nodes.set(mark[2], node);
      }

    }

    let prev = this.nodes.get(current);
    prev.next = first;
    this.nodes.set(last, prev);
  }

  findNextStop(position, stop) {
    let start = this.nodes.get(this.nodes.get(stop).next);

    // Traverse each node to find next stop.
    for (let node = start; node.name !== stop; node = this.nodes.get(node.next)) {
      let result = isNearStop(position, node.marks);
      if (result.isNear) {
        return {
          stopName: node.name,
          time: result.time,
          message: `Arriving at ${node.name} in approx. ${result.time} mins.`
        };
      }
    }

    return null;
  }
}

export default RouteGraph;
