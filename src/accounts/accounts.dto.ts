import { IsString, IsOptional, IsNotEmpty, Length } from 'class-validator';

export class CreateAccountsDto {
  @IsString()
  @IsNotEmpty()
  account_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(4, 4)
  mask: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  subtype: string;

  @IsString()
  @IsOptional()
  verification_status?: string;

  @IsString()
  @IsOptional()
  class_type?: string;

  @IsString()
  @IsNotEmpty()
  institution_name: string;

  @IsString()
  @IsNotEmpty()
  institution_id: string;
}
