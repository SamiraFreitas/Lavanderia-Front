type PriceProps = {
  type: string;
  weight: number;
  isDelivery: boolean;
}

export function CalculatePrice({type, weight, isDelivery}: PriceProps) {

  let priceKg = 0;
  switch (type) {
    case 'machine':
      priceKg = 50;
      break;
    case 'hand':
      priceKg = 70;
      break;
    case 'dry':
      priceKg = 100;
      break;
  }

  const price = priceKg * (weight > 0 ? weight : 0) + (isDelivery ? 5 : 0);
  return price;
}