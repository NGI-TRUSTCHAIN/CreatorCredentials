import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection, ConnectionStatus } from './connection.entity';
import { ClerkRole, User } from 'src/users/user.entity';

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connection)
    private connectionRepository: Repository<Connection>,
  ) {}

  private async getExistingConnection(issuer: User, creator: User) {
    return this.connectionRepository.findOne({
      where: [
        {
          issuerId: issuer.id,
          creatorId: creator.id,
          status: ConnectionStatus.Requested,
        },
        {
          issuerId: issuer.id,
          creatorId: creator.id,
          status: ConnectionStatus.Accepted,
        },
      ],
    });
  }

  private defineIssuerCreatorOrThrow(users: User[]): {
    issuer: User;
    creator: User;
  } {
    if (users.length !== 2) {
      throw new Error('Users array must have two users to create connection.');
    }

    let creator: User;
    let issuer: User;
    users.forEach((user) => {
      switch (user.clerkRole) {
        case ClerkRole.Creator:
          creator = user;
          break;
        case ClerkRole.Issuer:
          issuer = user;
          break;
      }
    });

    if (!creator || !issuer) {
      throw new Error(
        'Users array must have Issuer and Creator user to create connection.',
      );
    }

    return {
      issuer,
      creator,
    };
  }

  async createConnection(users: User[]): Promise<Connection> {
    const { issuer, creator } = this.defineIssuerCreatorOrThrow(users);

    const existingConnection = await this.getExistingConnection(
      issuer,
      creator,
    );

    if (existingConnection) {
      throw new Error('Connection already exists or is pending.');
    }

    const connection = new Connection();
    connection.issuer = issuer;
    connection.creator = creator;
    return this.connectionRepository.save(connection);
  }

  async revokeConnection(users: User[]): Promise<void> {
    const { issuer, creator } = this.defineIssuerCreatorOrThrow(users);

    const existingConnection = await this.getExistingConnection(
      issuer,
      creator,
    );

    if (!existingConnection) {
      throw new Error(`Revokable connection doesn't exist between users.`);
    }

    existingConnection.status = ConnectionStatus.Revoked;
    await this.connectionRepository.save(existingConnection);
  }

  async acceptConnection(users: User[]): Promise<void> {
    const { issuer, creator } = this.defineIssuerCreatorOrThrow(users);

    const existingConnection = await this.getExistingConnection(
      issuer,
      creator,
    );

    if (!existingConnection) {
      throw new Error('Connection not found or not requested.');
    }

    if (existingConnection.status === ConnectionStatus.Accepted) {
      throw new Error('Connection is Already accepted');
    }

    existingConnection.status = ConnectionStatus.Accepted;
    await this.connectionRepository.save(existingConnection);
  }

  async rejectConnection(users: User[]): Promise<void> {
    const { issuer, creator } = this.defineIssuerCreatorOrThrow(users);

    const existingConnection = await this.getExistingConnection(
      issuer,
      creator,
    );

    if (!existingConnection) {
      throw new Error('Connection not found or not requested.');
    }

    if (existingConnection.status === ConnectionStatus.Accepted) {
      throw new Error(
        'Connection is Already accepted and could not be rejected',
      );
    }

    existingConnection.status = ConnectionStatus.Rejected;
    await this.connectionRepository.save(existingConnection);
  }

  async getUserConnections(user: User): Promise<Connection[]> {
    return this.connectionRepository.find({
      where: [{ issuer: user }, { creator: user }],
    });
  }
}
