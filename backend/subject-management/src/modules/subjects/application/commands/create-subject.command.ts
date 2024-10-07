import { IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { SubjectStatus } from '../../domain/entities/subject-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectCommand {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  keywords: string;

  @ApiProperty({ enum: ['Pendente', 'Em Progresso', 'Concluído'] })
  @IsEnum(SubjectStatus)
  status: SubjectStatus;
}
