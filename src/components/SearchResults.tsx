"use client";

import type React from "react";
import { useSearch } from "@/context/SearchContext";
import type { SearchResult } from "@/types/search";
import StackOverflowResultCard from "./results/StackOverflowResultCard";
import WikipediaResultCard from "./results/WikipediaResultCard";
import GiphyResultCard from "./results/GiphyResultCard";
import { Button } from "./ui/button";
import { LuLoader } from "react-icons/lu";
import { motion } from "framer-motion";

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
  } = useSearch();

  const renderResultCard = (result: SearchResult, index: number) => {
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
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  // If there's no query, show an empty state
  if (!query) {
    return (
      <motion.div
        className="mt-16 text-center text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg">Enter a search query to get started</p>
      </motion.div>
    );
  }

  // If there are no results but we've searched
  if (!loading && results.length === 0 && query) {
    return (
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
    );
  }

  return (
    <div className="mt-8 mb-10">
      {/* Results count */}
      {results.length > 0 && (
        <motion.div
          className="text-sm text-gray-500 dark:text-gray-400 mb-4 mx-auto max-w-5xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Found {totalResults.toLocaleString()} results for "{query}"
        </motion.div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg mb-6 mx-auto max-w-5xl">
          <p>{error}</p>
        </div>
      )}

      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-5xl px-4">
        {results.map((result, index) => (
          <div key={`${result.source}-${result.id}`} className="h-full">
            {renderResultCard(result, index)}
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <LuLoader className="h-5 w-5 animate-spin" />
            <span>Loading results...</span>
          </div>
        </div>
      )}

      {/* Load more button */}
      {!loading && hasMore && results.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={loadMore}
            variant="outline"
            className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Load more results
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
