import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, ValidateNested, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

class AccountBodyDto {
  @ApiProperty({ description: 'Unique account ID', example: '12345' })
  @IsString()
  accountId: string;

  @ApiProperty({ description: 'Type of account', example: 'checking' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Subtype of account', example: 'personal' })
  @IsString()
  subtype: string;
}

export class TransactionDto {
  @ApiProperty({ description: 'Sender account details' })
  @ValidateNested()
  @Type(() => AccountBodyDto)
  from_account: AccountBodyDto;

  @ApiProperty({ description: 'Receiver account id' })
  @IsString()
  to_account_id: string;

  @ApiProperty({ description: 'Transaction amount', example: 250.75 })
  @IsNumber()
  @Min(5, { message: 'Transaction amount must be 5 or more' })
  amount: number;

  @ApiProperty({ description: 'User Id', example: 1 })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: 'Comma separated categories',
    example: 'Travel,Shopping,Movies',
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Transaction Details',
    example: 'Starbucks, Uber',
  })
  @IsString()
  name: string;
}
