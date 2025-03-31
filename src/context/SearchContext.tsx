"use client";

import type React from "react";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { SearchResult } from "@/types/search";
import { services } from "@/services";

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  setResults: (results: SearchResult[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  selectedSource: string | null;
  setSelectedSource: (source: string | null) => void;
  page: number;
  setPage: (page: number) => void;
  totalResults: number;
  setTotalResults: (total: number) => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  performSearch: (
    query: string,
    source?: string | null,
    page?: number
  ) => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = async (
    searchQuery: string,
    source: string | null = selectedSource,
    searchPage: number = page
  ) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setTotalResults(0);
      setHasMore(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let allResults: SearchResult[] = [];
      let allTotal = 0;
      let allHasMore = false;

      // If source is specified, search only that source
      if (source) {
        const serviceToUse = services.find(
          (s) => s.name.toLowerCase() === source.toLowerCase()
        );
        if (serviceToUse) {
          const response = await serviceToUse.search(searchQuery, searchPage);
          allResults = response.results;
          allTotal = response.totalResults;
          allHasMore = response.hasMore;
        }
      } else {
        // Search all services in parallel
        const promises = services.map((service) =>
          service.search(searchQuery, searchPage)
        );
        const responses = await Promise.all(promises);

        // Combine results
        allResults = responses.flatMap((response) => response.results);
        allTotal = responses.reduce(
          (sum, response) => sum + response.totalResults,
          0
        );
        allHasMore = responses.some((response) => response.hasMore);
      }

      setResults(searchPage > 1 ? [...results, ...allResults] : allResults);
      setTotalResults(allTotal);
      setHasMore(allHasMore);
    } catch (err) {
      console.error("Search error:", err);
      setError("An error occurred while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    query,
    setQuery,
    results,
    setResults,
    loading,
    setLoading,
    selectedSource,
    setSelectedSource,
    page,
    setPage,
    totalResults,
    setTotalResults,
    hasMore,
    setHasMore,
    error,
    setError,
    performSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
