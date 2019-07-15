interface MovieDetails {
    situation: string;
    language: string;
    duration: number;
    budget: number;
    revenue: number;
}

export default interface Movie {
    id: number;
    title: string;
    posterPath: string;
    voteAverage: number;
    releaseDate: string;
    overview: string;
    genreIds: number[];
    details?: MovieDetails;
}