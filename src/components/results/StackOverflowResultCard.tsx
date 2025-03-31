"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { StackOverflowResult } from "@/types/search";
import { Badge } from "@/components/ui/badge";
import { FaStackOverflow, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

interface StackOverflowResultCardProps {
  result: StackOverflowResult;
  index: number;
}

const StackOverflowResultCard: React.FC<StackOverflowResultCardProps> = ({
  result,
  index,
}) => {
  const formattedDate = new Date(
    result.creationDate * 1000
  ).toLocaleDateString();

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
              <FaStackOverflow className="text-orange-500 h-5 w-5 flex-shrink-0" />
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Stack Overflow
              </span>
            </div>

            <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-gray-100">
              {result.title}
            </h3>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {result.tags.slice(0, 4).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                >
                  {tag}
                </Badge>
              ))}
              {result.tags.length > 4 && (
                <Badge
                  variant="outline"
                  className="bg-gray-50 dark:bg-gray-900"
                >
                  +{result.tags.length - 4}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span
                    className={`font-medium ${
                      result.score > 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {result.score}
                  </span>
                  <span>votes</span>
                </div>

                <div className="flex items-center gap-1">
                  <span
                    className={`font-medium ${
                      result.isAnswered
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {result.answerCount}
                  </span>
                  <span>answers</span>
                  {result.isAnswered && (
                    <FaCheck className="text-green-500 ml-1 h-3 w-3" />
                  )}
                </div>
              </div>

              <span>{formattedDate}</span>
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
};

export default StackOverflowResultCard;
