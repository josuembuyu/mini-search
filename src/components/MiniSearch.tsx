"use client";

import type React from "react";
import { SearchProvider } from "@/context/SearchContext";
import { motion } from "framer-motion";

const MiniSearch: React.FC = () => {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 pb-20">
        <div className="container px-4 mx-auto">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-2">
              Mini Search
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Search across your favorite platforms in one place
            </p>
          </motion.div>
        </div>
      </div>
    </SearchProvider>
  );
};

export default MiniSearch;
