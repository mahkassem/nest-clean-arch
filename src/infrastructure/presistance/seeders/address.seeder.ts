import { Injectable } from '@nestjs/common';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/infrastructure/entities/user/user.entity';
import { Address } from 'src/infrastructure/entities/user/address.entity';

@Injectable()
export class AddressSeeder implements Seeder {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Address) private readonly address: Repository<Address>
  ) { }

  async seed(): Promise<any> {
    // Get users.
    const users = await this.user.createQueryBuilder('users')
      .select(['users.id', 'users.username'])
      .where('users.username != "superadmin"')
      .getMany();

    const addresses = [];
    // add address to users
    users.forEach((user, index) => {
      // generate random number between 1 and 5
      const randomAddressCount = Math.floor(0 + Math.random() * (4 - 0 + 1));
      if (randomAddressCount) {
        const userAddresses = DataFactory.createForClass(Address).generate(randomAddressCount);
        userAddresses.forEach((address) => {
          address.user_id = user.id;
          address.location = `POINT(${address.latitude} ${address.longitude})`;
          addresses.push(address);
        });
      }
    });

    // Insert into the database with relations.
    return this.address.save(addresses);
  }

  async drop(): Promise<any> {
    return this.address.delete({});
  }
}
