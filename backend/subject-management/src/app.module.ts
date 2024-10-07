import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './modules/subjects/domain/entities/subject.entity';
import { SubjectController } from './modules/subjects/presentation/controllers/subject/subject.controller';
import { ConfigModule } from '@nestjs/config';
import { SubjectService } from './modules/subjects/application/services/subject/subject.service';
import { SubjectRepository } from './modules/subjects/infrastructure/repository/subject.repository';
import { LinksModule } from './modules/links/links.module';
import { LinkService } from './modules/links/application/services/link/link.service';
import { LinkRepository } from './modules/links/infrastructure/repository/link.repository';
import { Link } from './modules/links/domain/entities/link.entity';
import { LinkController } from './modules/links/presentation/controllers/link/link.controller';
import { GdeltService } from './modules/subjects/infrastructure/api/gdelt.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Subject, Link],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Subject, Link]),
  ],
  controllers: [SubjectController],
  providers: [
    { provide: 'ISubjectService', useClass: SubjectService },
    { provide: 'ISubjectRepository', useClass: SubjectRepository },
    { provide: 'ILinkService', useClass: LinkService },
    { provide: 'ILinkRepository', useClass: LinkRepository },
    GdeltService,
  ],
})
export class AppModule { }
