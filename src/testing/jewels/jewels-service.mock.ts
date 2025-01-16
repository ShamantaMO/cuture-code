import { JewelsService } from "../../jewels/jewels.service";
import { responseDistribuiteJewelsMock } from "./resp-distribuite-jewels.mock";
import { jewelsMock } from "./jewels.mock";
import { updateJewelsMock } from "./update-jewels.mock";
import { responseCreateJewelsMock } from "./resp-create-jewels.mock";

export const jewelsServiceMock = {

    provide: JewelsService,
    useValue: {
        create: jest.fn().mockResolvedValue(responseCreateJewelsMock),
        distribuiteJewels: jest.fn().mockResolvedValue(responseDistribuiteJewelsMock),
        findAll: jest.fn().mockResolvedValue(jewelsMock),
        jewelById: jest.fn().mockResolvedValue(jewelsMock[3]),
        update: jest.fn().mockResolvedValue({...jewelsMock[0], ...updateJewelsMock}),
    }
}