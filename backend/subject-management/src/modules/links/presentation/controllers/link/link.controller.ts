import { Controller, Inject } from '@nestjs/common';
import { ILinkService } from '../../../../links/domain/services/link.service';

@Controller('link')
export class LinkController {
    constructor(
        @Inject('ILinkService')
        private readonly linkService: ILinkService) { }
}
