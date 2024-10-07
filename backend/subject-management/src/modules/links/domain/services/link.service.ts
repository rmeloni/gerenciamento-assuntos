import { Link } from "../entities/link.entity";

export interface ILinkService {
  create(command: Link): Promise<Link>;
  createBook(commands: Link[]): Promise<Link[]>;
  deleteBySubjectId(subjectId: string): Promise<void>;
}
