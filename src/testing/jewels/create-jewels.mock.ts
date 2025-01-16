import { TransactionEnum } from "../../enum/transaction.enum";

export const createJewelsMock = {
    name: 'Jewel',
    price: 60,
    description: 'Recompensa por evento finalizado com sucesso',
    transactionType: TransactionEnum.Reward,
    active: true

}