import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GdeltService {
    private readonly baseUrl = 'https://api.gdeltproject.org/api/v1/search_ftxtsearch/search_ftxtsearch';

    async fetchLinks(keywords: string): Promise<string> {
        const response = await axios.get(`${this.baseUrl}?query=${encodeURIComponent(keywords)}&output=urllist&maxrecords=10`);
        return response.data;
    }
}