/**
 * Handles all API calls to get bus information. The credentials for the API are secret so sorry, get it from UNCG if
 * you want to use it!
 */
export default class BusApi {
  constructor(server, username, password, database) {
    this.credentials = null;
    this.server = server;
    this.database = database;
    this.credentialStore = {
      cred: null,
      server: null,
      get: function () {
        if (this.cred && this.server) {
          return {credentials: this.cred, server: this.server};
        } else {
          return false;
        }
      },
      set: function (creds, servers) {
        this.cred = creds;
        this.servers = servers;
      },
      clear: function () {
        this.cred = null;
        this.servers = null;
      }
    };

    this.username = username;
    this.password = password;
  }

  /**
   * General method to make an API call.
   * @param method The method to perform
   * @param params The parameters to pass to the API.
   * @returns {Promise} The response from the API.
   */
  async call(method, params) {
    if (!this.credentials) {
      await this.authenticate();
    }
    console.log('sending request');
    params.credentials = this.credentials;
    return await this.sendCall(method, params);
  }

  /**
   * Gets all available vehicles in the database.
   * @returns {Promise.<Array>} Array of bus objects.
   */
  async getVehicles() {
    let vehicles = [];
    await this.call('Get', {
      typeName: 'Device'
    }).then((result) => result.text()).then((result) => JSON.parse(result).result).then((result) => {
      vehicles = result;
    });
    return vehicles;
  }

  /**
   * Gets all the named groups (Campus Loop, Spartan Village Express, etc.)
   * @returns {Promise.<Array>} Array of the group names.
   */
  async getGroups() {
    let groups = [];
    await this.call('Get', {
      typeName: 'Group'
    }).then((result) => result.text()).then((result) => JSON.parse(result).result).then((result) => {
      groups = result;
    });
    return groups;
  }

  /**
   * Gets bus information such as location and their ID.
   * @returns {Promise.<Array>} Array of bus information as objects.
   */
  async getVehicleInfo() {
    let info = [];
    await this.call('Get', {
      typeName: 'DeviceStatusInfo',
      search: {
        deviceSearch: {
          groups: [{
            id: "GroupCompanyId"
          }]
        }
      }
    }).then((result) => result.text()).then((result) => JSON.parse(result).result).then((result) => {
      info = result;
    });
    return info;
  }

  /**
   * Builds the URL for the API we are using.
   * @param method The method to call. (Depreciated?)
   * @returns {string} The URL for the API.
   */
  getCallUrl(method) {
    const thisServer = this.server.replace(/\S*:\/\//, "").replace(/\/$/, "");
    return "https://" + thisServer + "/apiv1" + (method ? "/" + method : "");
  }

  /**
   * Makes the API call. Only need to use the POST method.
   * @param method The method of the API we want to call.
   * @param params Parameters to supply the API.
   * @returns {Promise.<*>} Response of the API call.
   */
  async sendCall(method, params) {
    return await fetch(this.getCallUrl(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'JSON-RPC=' + JSON.stringify({
            method: method || '',
            params: params
          })
        }
    );
  }

  /**
   * Authenticates us to the API.
   * @returns {Promise.<Promise.<TResult>|*>}
   */
  async authenticate() {
    return await this.sendCall('Authenticate', {
      database: this.database,
      userName: this.username,
      password: this.password
    }).then((data) => data.text()).then((data) => {
      data = JSON.parse(data).result;
      if (data.path && data.path !== "ThisServer") {
        this.server = "https://" + data.path + "/";
      }
      this.credentials = data.credentials;
    });
  }


}
