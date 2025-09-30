export interface CreateRecipe {
    titulo: string,
    descricao: string,
    ingredientes: string[],
    instrucoes: string[],
    tempo_preparo_min: number,
}
