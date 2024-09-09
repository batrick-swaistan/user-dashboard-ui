import axios from "axios";

const BASE_URL = "http://localhost:3500";

class User {
  registerUser(data) {
    return axios.post(BASE_URL + "/api/user/register", data);
  }

  verifyUser(data) {
    return axios.post(BASE_URL + "/api/user/verify", data);
  }

  authenticateUser(data) {
    return axios.post(BASE_URL + "/api/user/authenticate", data);
  }
  getUserData(config) {
    return axios.get(BASE_URL + "/api/user/userdata", config);
  }

  updateUserInfo(data, config) {
    return axios.post(BASE_URL + "/api/user/updateuserinfo", data, config);
  }

  updateUserBio(data, config) {
    return axios.post(BASE_URL + "/api/user/updatebio", data, config);
  }

  updateUserGoal(data,config){
    return axios.post(BASE_URL + "/api/user/updategoal", data, config);

  }

  updateUserSkills(data,config){
    return axios.post(BASE_URL + "/api/user/updateskills", data, config);

  }
}

export default new User();
