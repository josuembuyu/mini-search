import type { SearchService } from "@/types/search";
import stackOverflowService from "./stackOverflowService";
import wikipediaService from "./wikipediaService";
import giphyService from "./giphyService";

// Export all services
export const services: SearchService[] = [
  stackOverflowService,
  wikipediaService,
  giphyService,
];

// Service map for easier lookup
export const serviceMap: Record<string, SearchService> = {
  stackoverflow: stackOverflowService,
  wikipedia: wikipediaService,
  giphy: giphyService,
};

export { default as stackOverflowService } from "./stackOverflowService";
export { default as wikipediaService } from "./wikipediaService";
export { default as giphyService } from "./giphyService";
