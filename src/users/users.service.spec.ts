import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";

describe('UserService', () => {
  let userService: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        userRepositoryMock,
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('Read', () => {
    it('should be find user by email', async () =>{
      const result = await userService.findByEmail('liz-dossantos82@jglima.com.br')

      expect(result).toHaveProperty('id')
      expect(result.deleteAt).toBeNull()
    })

    it('should be find all users', async () =>{
      const users = await userService.findAll()

      expect(users.length).toBeGreaterThan(0)
    })

    it('should be find user by id', async () => {
      const user = await userService.userById(3)

      expect(user).toHaveProperty('email')
    })

    it('should be see profile', async () =>{
      const user = await userService.userById(3)
  
      expect(user).toHaveProperty('coins')
      expect(user.deleteAt).toBeNull()
    })
  })
  describe('Update', () =>{
    it('should be possible to update the user', async () =>{
      const user = await userService.update(3, updateUserMock, userDecoratorMock)

      expect(user.firstName).toEqual('')
      expect(user.deleteAt).toBeNull()
    })
  })

  describe('Delete', ()=>{
    it('should be delete user', async () =>{
      const user = await userService.delete(4, userDecoratorMock)

      expect(user).toHaveProperty('message')
    })
  })
  
});