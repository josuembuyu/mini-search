"use client";

import type React from "react";
import { memo, useCallback } from "react";
import { useSearch } from "@/context/SearchContext";
import type { SearchResult } from "@/types/search";
import StackOverflowResultCard from "./results/StackOverflowResultCard";
import WikipediaResultCard from "./results/WikipediaResultCard";
import GiphyResultCard from "./results/GiphyResultCard";
import { Button } from "./ui/button";
import { LuLoader } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

const EmptyState = memo(() => (
  <motion.div
    className="mt-16 text-center text-gray-500 dark:text-gray-400"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-lg">Enter a search query to get started</p>
  </motion.div>
));

const NoResults = memo(() => (
  <motion.div
    className="mt-16 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
      No results found
    </h3>
    <p className="text-gray-500 dark:text-gray-400">
      Try a different search term or source
    </p>
  </motion.div>
));

const ResultsCount = memo(
  ({ total, query }: { total: number; query: string }) => (
    <motion.div
      className="text-sm text-gray-500 dark:text-gray-400 mb-4 mx-auto max-w-5xl px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      Found {total.toLocaleString()} results for "{query}"
    </motion.div>
  )
);

const LoadingIndicator = memo(() => (
  <div className="flex justify-center mt-8">
    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
      <LuLoader className="h-5 w-5 animate-spin" />
      <span>Loading results...</span>
    </div>
  </div>
));

const ResultCard = memo(
  ({ result, index }: { result: SearchResult; index: number }) => {
    switch (result.source) {
      case "stackoverflow":
        return <StackOverflowResultCard result={result} index={index} />;
      case "wikipedia":
        return <WikipediaResultCard result={result} index={index} />;
      case "giphy":
        return <GiphyResultCard result={result} index={index} />;
      default:
        return null;
    }
  }
);

const SearchResults: React.FC = () => {
  const {
    results,
    loading,
    error,
    hasMore,
    page,
    setPage,
    query,
    totalResults,
    performSearch,
    selectedSource,
  } = useSearch();

  const handleLoadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    performSearch(query, selectedSource, nextPage);
  }, [page, setPage, performSearch, query, selectedSource]);

  if (!query) return <EmptyState />;

  if (!loading && results.length === 0 && query) return <NoResults />;

  return (
    <div className="mt-8 mb-10">
      <AnimatePresence>
        {results.length > 0 && (
          <ResultsCount
            key="results-count"
            total={totalResults ?? 0}
            query={query}
          />
        )}

        {error && (
          <motion.div
            key="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg mb-6 mx-auto max-w-5xl"
          >
            <p>{error}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-5xl px-4">
          {results.map((result, index) => (
            <motion.div
              key={`${result.source}-${result.id}-${index}`}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ResultCard result={result} index={index} />
            </motion.div>
          ))}
        </div>

        {loading && <LoadingIndicator key="loading-indicator" />}

        {!loading && hasMore && results.length > 0 && (
          <motion.div
            key="load-more-button"
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Load more results
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(SearchResults);
