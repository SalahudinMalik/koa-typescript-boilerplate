import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  validate,
  ValidationError,
} from "class-validator";
import { plainToInstance, Type } from "class-transformer";
import { BadRequestError } from "../../../errors/BadRequestError";
import { AccountsAttributes } from "../../../database/models";
import { PaginationSchema } from "../../../interfaces/pagination";

export class AccountSchema implements AccountsAttributes {
    @IsOptional()
    @IsString()
    @IsIn(["Mr", "Mrs", "Miss", "Ms", "Dr"])
      title = "Mr";

    @IsDefined()
    @IsString()
    @Length(1)
      firstName: string;

    @IsDefined()
    @IsString()
    @Length(1)
      lastName: string;

    @IsDefined()
    @IsEmail({}, { message: "Email is not valid" })
    @IsNotEmpty({ message: "The email is required" })
      email: string;

    @IsOptional()
    @IsNumber()
    @IsIn([0, 1, 2, 3, 4])
      accountType = 1;

    @IsOptional()
    @IsString()
      phone: string;

    @IsOptional()
    @IsString()
      mobile: string;
}

export class AddAccountReqSchema extends AccountSchema {
  public async reqValidate(): Promise<AddAccountReqSchema> {
    const obj: AddAccountReqSchema = plainToInstance(AddAccountReqSchema, this);
    const errors: ValidationError[] = await validate(obj);
    if (errors.length > 0) {
      throw new BadRequestError(errors[0].toString(false, false), errors);
    }
    return obj as AddAccountReqSchema;
  }
}

export class UpdateAccountReqSchema extends AccountSchema {
  @IsDefined()
  @IsNumber()
  @Type(() => Number)
    id:number;

  public async reqValidate(): Promise<UpdateAccountReqSchema> {
    const obj: UpdateAccountReqSchema = plainToInstance(UpdateAccountReqSchema, this);
    const errors: ValidationError[] = await validate(obj);
    if (errors.length > 0) {
      throw new BadRequestError(errors[0].toString(false, false), errors);
    }
    return obj as UpdateAccountReqSchema;
  }
}

export class GetAllAccountSchema extends PaginationSchema {
    @IsOptional()
    @IsString()
    @Length(2)
      sort = "firstName";

    @IsOptional()
    @IsNumber({}, { each: true })
    @Type(() => Number)
      filters: number[] = [];

    @IsOptional()
    @IsNumber({}, { each: true })
    @Type(() => Number)
      accountType: number[] = [];

    public async reqValidate(): Promise<GetAllAccountSchema> {
      const obj: GetAllAccountSchema = plainToInstance(
        GetAllAccountSchema,
        this,
      );
      const errors: ValidationError[] = await validate(obj);
      if (errors.length > 0) {
        throw new BadRequestError(errors[0].toString(false, false), errors);
      }
      return obj as GetAllAccountSchema;
    }
}
