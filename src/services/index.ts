import type { SearchService } from "@/types/search";

export const services: SearchService[] = [
  {
    name: "GitHub",
    search: async (query: string, page: number) => {
      // TODO: Implement GitHub search
      return {
        results: [],
        totalResults: 0,
        hasMore: false,
      };
    },
  },
  {
    name: "Stack Overflow",
    search: async (query: string, page: number) => {
      // TODO: Implement Stack Overflow search
      return {
        results: [],
        totalResults: 0,
        hasMore: false,
      };
    },
  },
];
