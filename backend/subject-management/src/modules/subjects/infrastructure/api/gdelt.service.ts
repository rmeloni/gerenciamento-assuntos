import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TypeNews } from './type.news';


@Injectable()
export class GdeltService {

    async fetchLinks(keywords: string): Promise<string[]> {
        // TYPE_NEWS = Gdelt | NewsApi
        const typeApi = process.env.TYPE_NEWS;
        if (typeApi == TypeNews.GDELT)
            return this.fetchLinksGdelt(keywords);
        else if (typeApi == TypeNews.NEWSAPI)
            return this.fetchLinksByNewsApi(keywords);

        return null;
    }

    private async fetchLinksGdelt(keywords: string): Promise<string[]> {
        const baseUrl = 'https://api.gdeltproject.org/api/v1/search_ftxtsearch/search_ftxtsearch';
        const response = await axios.get(`${baseUrl}?query=${encodeURIComponent(keywords)}&output=urllist&maxrecords=10`);
        return this.stringResultToList(response.data);
    }

    private async fetchLinksByNewsApi(keywords: string): Promise<string[]> {
        const baseUrl = 'https://newsapi.org/v2/top-headlines';
        const response = await axios.get(`${baseUrl}?q=${encodeURIComponent(keywords)}&pageSize=10&apiKey=${process.env.API_KEY_NEWS_API}`);

        if (this.responseIsValid(response)) {
            return response.data.articles.map(item => item.url)
        }

        return null;
    }

    private responseIsValid(response): boolean {
        return response && response.data
            && response.data.articles
            && response.data.articles.length > 0;
    }

    private stringResultToList(urls: string): string[] {
        return urls
            ? urls.trim().split('\n')
                .flatMap(line => line.split(',').filter(this.isValidUrl))
            : [];
    }

    private isValidUrl(item: string): boolean {
        return item.includes('http');
    };
}