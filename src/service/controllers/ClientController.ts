import { Client } from '../models/Client';
import { clients } from '../data/data.json';

const ClientController = {
  async create(client: Client) {
    try {
      let clientsData: Client[] = [];
      const storage = localStorage.getItem('clients');

      if(storage){
        clientsData = JSON.parse(storage);
      }
      else {
        localStorage.setItem('clients', JSON.stringify(clients));
        clientsData = JSON.parse(JSON.stringify(clients));
      }

      if(clientsData.find((e) => e.cpf === client.cpf)){
        alert("error Client Exists");
        return
      }

      clientsData.push(client);
      localStorage.setItem('clients', JSON.stringify(clientsData));
      return client;
      
    }catch (error) {
      alert("error Client Exists");
   }
  },

  async read() {
    try {
      const storage = localStorage.getItem('clients');
      if(storage){
        const clientsData: Client[] = JSON.parse(storage);
        return clientsData;
      }
      else {
        localStorage.setItem('clients', JSON.stringify(clients));
        const clientsData: Client[] = JSON.parse(JSON.stringify(clients));
        return clientsData;
      }
    } catch (error) {
      alert("Could not list.\n" + error);
    }
  },
  
  async update(client: Client) {
    try {
      let clientsData: Client[] = [];
      const storage = localStorage.getItem('clients');

      if(storage){
        clientsData = JSON.parse(storage);
      }
      else {
        localStorage.setItem('clients', JSON.stringify(clients));
        clientsData = JSON.parse(JSON.stringify(clients));
      }

      const index = clientsData.findIndex((e) => e.id === client.id);

      if(index >= 0){
        clientsData[index] = client;
        localStorage.setItem('clients', JSON.stringify(clientsData));
        return client;
      }
      else {
        alert("error Client Exists");
        return
      }
      
    } catch (error) {
      alert("Could not update.\n" + error);
    }
  },
  
  async delete(elements: {id: string}[]) {
    try {
      let clientsData: Client[] = [];
      const storage = localStorage.getItem('clients');

      if(storage){
        clientsData = JSON.parse(storage);
      }
      else {
        localStorage.setItem('clients', JSON.stringify(clients));
        clientsData = JSON.parse(JSON.stringify(clients));
      }

      elements.forEach((element) => {
        const index = clientsData.findIndex((e) => e.id === element.id);
        if(index >= 0){
          clientsData.splice(index, 1);
          localStorage.setItem('clients', JSON.stringify(clientsData));
        }
        else {
          alert(`error Client ${index} no exists!`);
        }
      });
    } catch (error) {
      alert("don't was not possible to delete.\n" + error);
    }
  },

  async show(code: string, search: string) {
    try {
      let clientsData: Client[] = [];
      const storage = localStorage.getItem('clients');

      if(storage){
        clientsData = JSON.parse(storage);
      }
      else {
        localStorage.setItem('clients', JSON.stringify(clients));
        clientsData = JSON.parse(JSON.stringify(clients));
      }

      let client;
      switch (search) {
        case 'id':
          client = clientsData.find((e) => e.id === code);
          break;
        case 'cpf':
          client = clientsData.find((e) => e.cpf === code);
          break;
      }

      if(client){
        return client;
      }
      else{
        alert("error Client don't Exists");
        return
      }
    } catch (error) {
      alert("Could not show.\n" + error);
    }
  },
}

export default ClientController;