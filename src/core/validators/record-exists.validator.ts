import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
} from 'class-validator';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ async: true })
export class RecordExists implements ValidatorConstraintInterface {
    constructor(private readonly dataSource: DataSource) { }

    async validate(value: any, args: ValidationArguments) {
        const [entityName] = args.constraints;
        const entity = this.dataSource.manager.getRepository(entityName);
        const result = await entity.findOne({ where: { id: value } });
        return result != null;

    }
    defaultMessage(args: ValidationArguments) {
        const [entityName] = args.constraints;
        const property = args.property;
        return `Record ${property} not exists in table ${entityName}`
    }
}

export function IsExist(
    entityName: string,
    validationOptions?: ValidationOptions) {
    return function (object: unknown, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [entityName],
            validator: RecordExists,
        });
    };
}