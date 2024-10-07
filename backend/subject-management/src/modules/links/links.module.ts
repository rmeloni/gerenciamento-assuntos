import { Module } from '@nestjs/common';
import { LinkController } from './presentation/controllers/link/link.controller';
import { LinkService } from './application/services/link/link.service';

@Module({
  controllers: [LinkController],
  providers: [LinkService]
})
export class LinksModule { }
