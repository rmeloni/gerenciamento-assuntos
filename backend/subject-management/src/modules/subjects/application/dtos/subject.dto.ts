import { ApiProperty } from "@nestjs/swagger";
import { SubjectStatus } from "../../domain/entities/subject-status.enum";

export class SubjectDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    keywords: string;

    @ApiProperty()
    status: SubjectStatus;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    links: string[]
}