import { Cost } from '../models/Cost'

export function CalculateCosts(cost: Cost) {

  cost.costMedium = (cost.expenses + cost.profit);
  let sum = 0;

  while(sum < cost.costMedium ) {
    sum = sum + cost.washingMachine;
    cost.weightMinimum = cost.weightMinimum + 1;
  }

  cost.costMedium = sum;
  cost.profit = (sum - cost.expenses);

  return cost;
}