import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/core/base/database/base.transaction';
import { EntityRelatedValidator } from 'src/core/validators/entity-related.validator';
import { Address } from 'src/infrastructure/entities/user/address.entity';
import { User } from 'src/infrastructure/entities/user/user.entity';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class SetFavoriteAddressTransaction extends BaseTransaction<
  { id: string; user: User },
  Address
> {
  constructor(
    dataSource: DataSource,
    private entityRelatedValidator: EntityRelatedValidator,
  ) {
    super(dataSource);
  }

  // the important thing here is to use the manager that we've created in the base class
  protected async execute(
    req: { id: string; user: User },
    context: EntityManager,
  ): Promise<Address> {
    try {
      // get current favorite address
      const currentFavoriteAddress = await context.findOneBy<Address>(
        Address,
        { user_id: req.user.id, is_favorite: true },
      );
      // if current favorite address exists, set it to false
      if (currentFavoriteAddress) {
        currentFavoriteAddress.is_favorite = false;
        await context.save(Address, currentFavoriteAddress);
      }
      // get the entity first
      const item = await context.findOneBy(Address, { id: req.id });
      this.entityRelatedValidator.isExist(item);
      this.entityRelatedValidator.ownership(item, req.user);
      // set the entity as favorite
      item.is_favorite = true;
      // save the entity
      return await context.save(Address, item);
    } catch (error) {
      throw new BadRequestException('message.invalid_operation');
    }
  }
}
