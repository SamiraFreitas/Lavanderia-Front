import { Cost } from '../models/Cost';
import { cost } from '../data/data.json';

const CostController = {

  async update(newCost: Cost) {
    try {
      let costData: Cost;
      const costStorage = localStorage.getItem('cost');

      if(costStorage){
        costData = JSON.parse(costStorage);
      }
      else {
        localStorage.setItem('cost', JSON.stringify(cost));
        costData = JSON.parse(JSON.stringify(cost));
      }

      costData = newCost;
      localStorage.setItem('cost', JSON.stringify(costData));
      return costData;
      
    } catch (error) {
      alert("Could not update.\n" + error);
    }
  },

  async show() {
    try {
      let costData: Cost;
      const costStorage = localStorage.getItem('cost');

      if(costStorage){
        costData = JSON.parse(costStorage);
      }
      else {
        localStorage.setItem('cost', JSON.stringify(cost));
        costData = JSON.parse(JSON.stringify(cost));
      }

      return costData;

    } catch (error) {
      alert("Could not show.\n" + error);
    }
  },
}

export default CostController;