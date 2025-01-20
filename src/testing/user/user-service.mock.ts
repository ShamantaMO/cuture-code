import { UsersService } from "../../users/users.service";
import { usersMock } from "./users.mock";
import { updateUserMock } from "./update-user.mock";


export const userServiceMock = {
    provide: UsersService,
    useValue: {
        profile: jest.fn().mockResolvedValue(usersMock[1]),
        findAll: jest.fn().mockResolvedValue(usersMock),
        userById: jest.fn().mockResolvedValue(usersMock[2]),
        update: jest.fn().mockResolvedValue({...usersMock[4], ...updateUserMock}),
        delete: jest.fn().mockResolvedValue({message: 'ok'}),
    }
}