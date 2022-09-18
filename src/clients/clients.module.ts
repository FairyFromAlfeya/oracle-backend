import { Module, Global } from '@nestjs/common';
import { EverscaleService } from './everscale.service';

@Global()
@Module({
  providers: [EverscaleService],
  exports: [EverscaleService],
})
export class ClientsModule {}
