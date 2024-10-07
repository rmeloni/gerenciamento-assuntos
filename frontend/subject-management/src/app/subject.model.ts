export interface Subject {
    id: string;
    title: string;
    keywords: string;
    // 'Pendente', 'Em Progresso', 'Concluído'
    status: string;
    createdAt: Date;
    updatedAt: Date;
    position?: number;
    links: string[];
}