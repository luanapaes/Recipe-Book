export interface Recipe {
    id: number, 
    titulo: string, 
    descricao: string, 
    ingredientes: string[], 
    instrucoes: string[], 
    tempo_preparo_min: number, 
    createAt: Date, 
    userId: number, 
    user: string;
}
