"use client";

import type React from "react";
import { useState, useEffect, useCallback, memo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LuSearch, LuX } from "react-icons/lu";
import { useSearch } from "@/context/SearchContext";
import { motion } from "framer-motion";

interface SearchInputProps {
  onSearchSubmit?: () => void;
}

const ClearButton = memo(({ onClick }: { onClick: () => void }) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    onClick={onClick}
    className="absolute right-16 h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
  >
    <LuX className="w-5 h-5" />
    <span className="sr-only">Clear search</span>
  </Button>
));

const SearchButton = memo(({ disabled }: { disabled: boolean }) => (
  <Button
    type="submit"
    variant="default"
    size="icon"
    disabled={disabled}
    className="h-10 w-10 mr-2 rounded-full shadow-sm"
  >
    <LuSearch className="w-5 h-5" />
    <span className="sr-only">Search</span>
  </Button>
));

const SearchInput: React.FC<SearchInputProps> = memo(({ onSearchSubmit }) => {
  const { query, setQuery, performSearch, loading } = useSearch();
  const [inputValue, setInputValue] = useState(query);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (inputValue.trim() === "") return;

      setQuery(inputValue);
      performSearch(inputValue);
      onSearchSubmit?.();
    },
    [inputValue, setQuery, performSearch, onSearchSubmit]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const handleClear = useCallback(() => {
    setInputValue("");
    setQuery("");
  }, [setQuery]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="relative">
        <motion.div
          className={`relative flex items-center rounded-full overflow-hidden bg-white ring-2 transition-all duration-200 ${
            isFocused
              ? "ring-blue-400 shadow-lg shadow-blue-100/50 dark:shadow-blue-900/20"
              : "ring-gray-200 dark:ring-gray-700"
          }`}
          animate={{
            scale: isFocused ? 1.01 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Input
            type="text"
            placeholder="Search across the web..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="border-0 shadow-none h-14 px-5 text-lg bg-white dark:bg-gray-950 flex-grow rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          {inputValue && <ClearButton onClick={handleClear} />}

          <SearchButton disabled={loading || !inputValue.trim()} />
        </motion.div>
      </form>
    </motion.div>
  );
});

SearchInput.displayName = "SearchInput";

export default SearchInput;
