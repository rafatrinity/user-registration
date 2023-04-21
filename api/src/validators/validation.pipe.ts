import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
  async transform(value: unknown, { metatype }: ArgumentMetadata): Promise<unknown> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    const validationErrors = await Promise.all(errors);
    if (validationErrors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: unknown): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type) && metatype !== undefined;
  }
}