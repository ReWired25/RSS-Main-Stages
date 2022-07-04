import { Callback } from './functions';

export type SourceInfo = {
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

export type ArticleInfo = {
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

export interface newsClass {
    draw: (data: ArticleInfo[]) => void;
}

export interface sourceClass {
    draw: (data: SourceInfo[]) => void;
}

export interface controllerClass {
    getSources: (callback: Callback<IDataSource>) => void;
    getNews: (e: Event, callback: Callback<IDataNews>) => void;
    getFoundNews: (regexp: RegExp) => void;
}

export interface viewClass {
    drawNews: (data: IDataNews) => void;
    drawSources: (data: IDataSource) => void;
}
