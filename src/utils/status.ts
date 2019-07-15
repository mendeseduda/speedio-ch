interface Dictionary<T, K> {
    [key: string]: T;
}

export const movieStatus: Dictionary<string, string> = {
    'Rumored': 'Rumores',
    'Planned': 'Planejado',
    'In Production': 'Em Produção',
    'Post Production': 'Pós Produção',
    'Released': 'Lançado',
    'Canceled': 'Cancelado'
} 