import CustosAPI from '../../API/custosAPI';
import { UsuarioData } from '../../pages/Login'

type PriceProps = {
  type: number;
  weight: number;
}

export async function CalculatePrice({type, weight}: PriceProps) {

  let priceKg = 0;

  const custos = new CustosAPI()

  await custos.getCustos(UsuarioData.LogedUser.cnpj_lavanderia).then((dados) => {
    if (dados) {
      switch (type) {
        case 1:
          priceKg = dados.custo_maquina;
          break;
        case 2:
          priceKg = dados.custo_mao;
          break;
        case 3:
          priceKg = dados.custo_seco;
          break;
      }
    }
  });

  const price = priceKg * (weight > 0 ? weight : 0);
  return price;
}