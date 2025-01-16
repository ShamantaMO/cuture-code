import { TransactionEnum } from "../../enum/transaction.enum";

export const responseCreateJewelsMock = {
    id: 10,
    name: 'Jewel',
    price: 60,
    description: 'Recompensa por evento',
    transactionType: TransactionEnum.Reward,
    active: true
}