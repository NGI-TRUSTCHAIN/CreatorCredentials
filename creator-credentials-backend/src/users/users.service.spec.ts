import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  const exampleWallet = 'wallet_address1';
  const exampleUser = {
    id: 1,
    publicToAddress: exampleWallet,
    currentNonce: '123',
    nonceChangedAt: new Date(),
  };
  const mockJwtService = {
    verify: jest.fn(),
    sign: jest.fn(),
  };

  const repositoryMock = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: repositoryMock,
        },

        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.resetAllMocks();
  });

  it('should register new user', async () => {
    (repositoryMock.findOneBy as jest.Mock).mockResolvedValue(null);
    (repositoryMock.save as jest.Mock).mockResolvedValue(exampleUser);
    await service.create({ publicAddress: exampleWallet });
    expect(repositoryMock.save as jest.Mock).toHaveBeenCalled();
  });

  it('should throw when registering again with same address', async () => {
    (repositoryMock.findOneBy as jest.Mock).mockResolvedValue(exampleUser);
    await expect(
      service.create({ publicAddress: exampleWallet }),
    ).rejects.toThrowError(BadRequestException);
    expect(repositoryMock.save as jest.Mock).not.toHaveBeenCalled();
  });
  it('should return error trying to get nonce for unregistered user', async () => {
    (repositoryMock.findOneBy as jest.Mock).mockResolvedValue(null);
    await expect(
      service.findNonceByPublicAddress('wallet_address2'),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return nonce for registered user', async () => {
    (repositoryMock.findOneBy as jest.Mock).mockResolvedValue(exampleUser);
    const result = await service.findNonceByPublicAddress('wallet_address2');
    expect(result.nonce).toEqual(exampleUser.currentNonce);
  });
});
