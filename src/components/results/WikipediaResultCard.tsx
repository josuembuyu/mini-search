"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { WikipediaResult } from "@/types/search";
import { FaWikipediaW } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

interface WikipediaResultCardProps {
  result: WikipediaResult;
  index: number;
}

const WikipediaResultCard: React.FC<WikipediaResultCardProps> = ({
  result,
  index,
}) => {
  const cleanSnippet = result.snippet.replace(/<\/?span[^>]*>/g, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <a
        href={result.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-all duration-200 hover:no-underline"
      >
        <Card className="overflow-hidden h-full border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <FaWikipediaW className="text-gray-700 dark:text-gray-300 h-5 w-5 flex-shrink-0" />
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Wikipedia
              </span>
            </div>

            <div className="flex gap-3">
              {result.thumbnail && (
                <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden mt-1">
                  <Image
                    src={result.thumbnail}
                    alt={result.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              )}

              <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-1.5 text-gray-900 dark:text-gray-100">
                  {result.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {cleanSnippet ||
                    "View this Wikipedia article for more information."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
};

export default WikipediaResultCard;
