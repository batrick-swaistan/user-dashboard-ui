import axios from "axios";

const BASE_URL = "http://localhost:3500";

class User {
  getUserData(config) {
    return axios.get(BASE_URL + "/userdata", config);
  }
}

export default new User();
