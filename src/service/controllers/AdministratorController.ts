import { Administrator } from '../models/Administrator';
import { administrator } from '../data/data.json';

const AdministratorController = {

  async login(admin: Administrator) {
    try {
      let administratorData: Administrator;
      const administratorStorage = localStorage.getItem('administrator');

      if(administratorStorage){
        administratorData = JSON.parse(administratorStorage);
      }
      else {
        localStorage.setItem('administrator', JSON.stringify(administrator));
        administratorData = JSON.parse(JSON.stringify(administrator));
      }

      if (admin.password !== administratorData.password) {
        return false;
      }

      localStorage.setItem('token', JSON.stringify(administratorData.token));

      return true;

    } catch (error) {
      alert("Could not login.\n" + error);
    }
  },

  async logout() {
    try {
      const tokenStorage = localStorage.getItem('token');

      if(tokenStorage){
        localStorage.removeItem('token');
        return true;
      }
      return false;

    } catch (error) {
      alert("Could not logout.\n" + error);
    }
  },
}

export default AdministratorController;