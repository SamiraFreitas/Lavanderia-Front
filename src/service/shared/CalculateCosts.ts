type CostsProps = {
  expenses: number;
  washValue: number;
  desiredProfit: number;
}

export function CalculateCosts({expenses, washValue, desiredProfit}: CostsProps) {

  if(!expenses) {
    alert('Valor de Despesas inválido!!');
    return;
  }

  if(!washValue) {
    alert('Valor de Lavagem inválido!!');
    return;
  }

  if(!desiredProfit) {
    alert('Valor de Funcionário inválido!!');
    return;
  }

  let  averageCost = (expenses + desiredProfit);
  let minimumWeight = 0;
  let sum = 0;

  while(sum < averageCost) {
    sum = sum + washValue;
    minimumWeight = minimumWeight + 1;
  }

  averageCost = sum;
  let profit = (sum - expenses);

  averageCost = parseFloat(averageCost.toFixed(2));
  profit = parseFloat(profit.toFixed(2));

  return {averageCost, minimumWeight, profit};
}