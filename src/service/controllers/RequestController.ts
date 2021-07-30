import { Request } from '../models/Request';
import { Client } from '../models/Client';
import { requests, clients } from '../data/data.json';

const RequestController = {
  async create(request: Request) {
    try {
      let requestsData: Request[] = [];
      let clientsData: Client[] = [];
      const requestsStorage = localStorage.getItem('requests');
      const clientsStorage = localStorage.getItem('clients');

      if(requestsStorage){
        requestsData = JSON.parse(requestsStorage);
      }
      else {
        localStorage.setItem('requests', JSON.stringify(requests));
        requestsData = JSON.parse(JSON.stringify(requests));
      }

      if(clientsStorage){
        clientsData = JSON.parse(clientsStorage);
      }
      else {
        localStorage.setItem('clients', JSON.stringify(clients));
        clientsData = JSON.parse(JSON.stringify(clients));
      }

      if(!(clientsData.find((e) => e.cpf === request.cpf))){
        alert("error Client Exists");
        return
      }

      requestsData.push(request);
      localStorage.setItem('requests', JSON.stringify(requestsData));
      return request;
      
    }catch (error) {
      alert("error Request Exists");
   }
  },

  async read() {
    try {
      const requestsStorage = localStorage.getItem('requests');
      if(requestsStorage){
        const requestsData: Request[] = JSON.parse(requestsStorage);
        return requestsData;
      }
      else {
        localStorage.setItem('requests', JSON.stringify(requests));
        const requestsData: Request[] = JSON.parse(JSON.stringify(requests));
        return requestsData;
      }
    } catch (error) {
      alert("Could not list.\n" + error);
    }
  },
  
  async update(request: Request) {
    try {
      let requestsData: Request[] = [];
      const requestsStorage = localStorage.getItem('requests');

      if(requestsStorage){
        requestsData = JSON.parse(requestsStorage);
      }
      else {
        localStorage.setItem('requests', JSON.stringify(requests));
        requestsData = JSON.parse(JSON.stringify(requests));
      }

      const index = requestsData.findIndex((e) => e.id === request.id);

      if(index >= 0){
        requestsData[index] = request;
        localStorage.setItem('requests', JSON.stringify(requestsData));
        return request;
      }
      else {
        alert("error Request Exists");
        return
      }
      
    } catch (error) {
      alert("Could not update.\n" + error);
    }
  },
  
  async delete(elements: {id: string}[]) {
    try {
      let requestsData: Request[] = [];
      const requestsStorage = localStorage.getItem('requests');

      if(requestsStorage){
        requestsData = JSON.parse(requestsStorage);
      }
      else {
        localStorage.setItem('requests', JSON.stringify(requests));
        requestsData = JSON.parse(JSON.stringify(requests));
      }

      elements.forEach((element) => {
        const index = requestsData.findIndex((e) => e.id === element.id);
        if(index >= 0){
          requestsData.splice(index, 1);
          localStorage.setItem('requests', JSON.stringify(requestsData));
        }
        else {
          alert(`error Request ${index} no exists!`);
        }
      });
    } catch (error) {
      alert("don't was not possible to delete.\n" + error);
    }
  },

  async show(id: string) {
    try {
      let requestsData: Request[] = [];
      const requestsStorage = localStorage.getItem('requests');

      if(requestsStorage){
        requestsData = JSON.parse(requestsStorage);
      }
      else {
        localStorage.setItem('requests', JSON.stringify(requests));
        requestsData = JSON.parse(JSON.stringify(requests));
      }

      const request = requestsData.find((e) => e.id === id);

      if(request){
        return request;
      }
      else{
        alert("error Request Exists");
        return
      }
    } catch (error) {
      alert("Could not show.\n" + error);
    }
  },
}

export default RequestController;