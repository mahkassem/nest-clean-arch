import { BadRequestException, Injectable } from "@nestjs/common";
import { OwnedEntity } from "src/infrastructure/base/owned.entity";
import { User } from "src/infrastructure/entities/user/user.entity";

@Injectable()
export class EntityRelatedValidator {
    ownership(entity: Partial<OwnedEntity>, user: User) {
        if (entity.user_id !== user.id)
            throw new BadRequestException('message.not_allowed_to_action');
    }

    isExist(entity: Partial<OwnedEntity>) {
        if (!entity)
            throw new BadRequestException('message.record_not_found');
    }
}
