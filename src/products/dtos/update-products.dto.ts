import { PartialType } from '@nestjs/swagger';
import { CreateProdutsDto } from './createproducts.dto';

export class UpdateProductsDto extends PartialType(CreateProdutsDto) {}
