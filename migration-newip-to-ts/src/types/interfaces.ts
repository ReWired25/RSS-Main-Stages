type SourceInfo = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

export interface IDataSource {
    status: string;
    sources: SourceInfo[];
}

type ArticleInfo = {
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

export interface IDataNews {
    status: string;
    totalResults: number;
    articles: ArticleInfo[];
}
