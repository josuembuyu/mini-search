// Base type for all search results
export interface BaseSearchResult {
  id: string;
  title: string;
  link: string;
  source: "stackoverflow" | "wikipedia" | "giphy";
}

// Stack Overflow specific result
export interface StackOverflowResult extends BaseSearchResult {
  source: "stackoverflow";
  answerCount: number;
  isAnswered: boolean;
  score: number;
  tags: string[];
  creationDate: number;
}

// Wikipedia specific result
export interface WikipediaResult extends BaseSearchResult {
  source: "wikipedia";
  snippet: string;
  thumbnail?: string;
}

// GIPHY specific result
export interface GiphyResult extends BaseSearchResult {
  source: "giphy";
  imageUrl: string;
  previewUrl: string;
  username: string;
}

// Union type for any search result
export type SearchResult = StackOverflowResult | WikipediaResult | GiphyResult;

// Search response type
export interface SearchResponse {
  results: SearchResult[];
  totalResults: number;
  hasMore: boolean;
}

// Search service interface
export interface SearchService {
  search: (query: string, page?: number) => Promise<SearchResponse>;
  name: string;
  icon: string;
}
