import { Controller, Post, Body, Get, Param, Put, Delete, Inject } from '@nestjs/common';
import { CreateSubjectCommand } from '../../../application/commands/create-subject.command';
import { UpdateSubjectCommand } from '../../../application/commands/update-subject.command';
import { ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { SubjectDto } from '../../../application/dtos/subject.dto';
import { ISubjectService } from '../../../domain/services/subject.service';

@ApiTags('assuntos')
@Controller('subjects')
export class SubjectController {
    constructor(
        @Inject('ISubjectService')
        private readonly subjectService: ISubjectService) { }

    @Post()
    @ApiOperation({ summary: 'Criar um novo assunto' })
    @ApiResponse({ status: 201, description: 'Assunto criado com sucesso.' })
    async create(@Body() createSubjectDto: CreateSubjectCommand): Promise<SubjectDto> {
        return this.subjectService.create(createSubjectDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos os assuntos' })
    @ApiResponse({ status: 200, description: 'Lista de assuntos retornada.', type: [SubjectDto] })
    findAll(): Promise<SubjectDto[]> {
        return this.subjectService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obter um assunto por ID' })
    @ApiParam({ name: 'id', description: 'ID do assunto' })
    @ApiResponse({ status: 200, description: 'Assunto encontrado.', type: SubjectDto })
    @ApiResponse({ status: 404, description: 'Assunto não encontrado.' })
    findById(@Param('id') id: string): Promise<SubjectDto> {
        return this.subjectService.findById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar um assunto' })
    @ApiParam({ name: 'id', description: 'ID do assunto' })
    async update(@Param('id') id: string, @Body() subject: UpdateSubjectCommand): Promise<SubjectDto> {
        return await this.subjectService.update(id, subject);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar um assunto' })
    @ApiParam({ name: 'id', description: 'ID do assunto' })
    @ApiResponse({ status: 204, description: 'Assunto deletado.' })
    async delete(@Param('id') id: string): Promise<void> {
        return this.subjectService.delete(id);
    }
}