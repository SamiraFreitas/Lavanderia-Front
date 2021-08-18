import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { LabelAndChange } from "../../components/LabelAndChange";
import "./styles.scss";
import { Modal } from "../../components/Modal";

import CustosAPI, { Custos } from "../../API/custosAPI";
import { UsuarioData } from "../Login";

export function Costs() {
	const [expenses, setExpenses] = useState(0);
	const [profit, setProfit] = useState(0);
	const [washingMachine, setWashingMachine] = useState(0);
	const [washingHand, setWashingHand] = useState(0);
	const [washingDry, setWashingDry] = useState(0);
	const [weightMaximun, setWeightMaximun] = useState(0);

	const [alertFullFields, setAlertFullFields] = useState(false);
	const [alertEdited, setAlertEdited] = useState(false);

	const [custos, setCustos] = useState(new CustosAPI());
	const [data, setData] = useState(UsuarioData);

	useEffect(() => {
		const item = custos.getCustos(
			data.LogedUser.cnpj_lavanderia
		).then((item) => {if (item) {
			setExpenses(item.despesa);
			setProfit(item.lucro_esperado);
			setWashingMachine(item.custo_maquina);
			setWashingHand(item.custo_mao);
			setWashingDry(item.custo_seco);

			setWeightMaximun(
				(item.despesa + item.lucro_esperado) /
					Math.min(item.custo_maquina, item.custo_mao, item.custo_seco)
			);
		}}) as unknown as Custos;
		console.log(item);
	}, [custos, data.LogedUser]);

	function handleCalculate(event: FormEvent) {
		event.preventDefault();

		if (
			expenses !== 0 &&
			profit !== 0 &&
			washingMachine !== 0 &&
			washingHand !== 0 &&
			washingDry !== 0
		) {
			setWeightMaximun(
				(expenses + profit) /
					Math.min(washingMachine, washingHand, washingDry)
			);
		} else {
			setAlertFullFields(true);
		}
	}

	function handleSaveEditions() {
		if (
			expenses &&
			profit &&
			washingMachine &&
			washingHand &&
			washingDry &&
			weightMaximun
		) {

      const value: Custos = {
        despesa: expenses,
        lucro_esperado: profit,
        custo_mao: washingHand,
        custo_maquina: washingMachine,
        custo_seco: washingMachine,
        cnpj_lavanderia: data.LogedUser.cnpj_lavanderia
      }

			custos.updateCustos(value).then((dados) => {
				if (dados) {
          setAlertEdited(true);
        }
      });
      custos.costs = value
		} else {
			setAlertFullFields(true);
		}
	}

	return (
		<div id='costs-page'>
			<Header title='Custos' />

			<main>
				<div className='board'>
					<form onSubmit={handleCalculate}>
						<div>
							<h3>Valores Estipulados</h3>
							<LabelAndChange
								input
								name='Despesas'
								type='text'
								placeholder='Digite o somatório das despesas...'
								onChange={(event) =>
									setExpenses(parseFloat(event.target.value) || 0)
								}
								value={expenses !== 0 ? expenses : undefined}
							/>

							<LabelAndChange
								input
								name='Lucro Desejado'
								type='text'
								placeholder='Digite o lucro desejado...'
								onChange={(event) =>
									setProfit(parseFloat(event.target.value) || 0)
								}
								value={profit !== 0 ? profit : undefined}
							/>
						</div>

						<div>
							<h3>Valores de Serviço (por Kg)</h3>
							<LabelAndChange
								input
								name='Maquina'
								type='text'
								placeholder='Digite o valor da lavagem por Kg...'
								onChange={(event) =>
									setWashingMachine(parseFloat(event.target.value) || 0)
								}
								value={washingMachine !== 0 ? washingMachine : undefined}
							/>

							<LabelAndChange
								input
								name='Mão'
								type='text'
								placeholder='Digite o valor da lavagem por Kg...'
								onChange={(event) =>
									setWashingHand(parseFloat(event.target.value) || 0)
								}
								value={washingHand !== 0 ? washingHand : undefined}
							/>

							<LabelAndChange
								input
								name='Seco'
								type='text'
								placeholder='Digite o valor da lavagem por Kg...'
								onChange={(event) =>
									setWashingDry(parseFloat(event.target.value) || 0)
								}
								value={washingDry !== 0 ? washingDry : undefined}
							/>
						</div>

						<Button isOutlined type='submit'>
							Calcular
						</Button>
					</form>

					<div className='section'>
						<h3>Previsão</h3>
						<div className='results'>
							<div>
								<LabelAndChange span name='Peso máximo a ser lavado'>
									{weightMaximun.toFixed(2)} Kg
								</LabelAndChange>
							</div>

							<div>
								<LabelAndChange span name='Lucro Estimado'>
                  R${profit.toFixed(2)}
								</LabelAndChange>
							</div>
						</div>
					</div>
				</div>
				<Button onClick={handleSaveEditions}>Salvar alterações</Button>
			</main>

			{alertFullFields ? (
				<Modal
					alert
					title='Alerta ao calcular custos'
					handleToCancel={() => {
						setAlertFullFields(false);
					}}>
					Preencha todos os campos!
				</Modal>
			) : (
				false
			)}

			{alertEdited ? (
				<Modal
					alert
					title='Custo Editado'
					handleToCancel={() => {
						setAlertEdited(false);
					}}>
					{`Custos editado com sucesso!!!`}
				</Modal>
			) : (
				false
			)}
		</div>
	);
}
