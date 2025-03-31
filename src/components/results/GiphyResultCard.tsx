"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { GiphyResult } from "@/types/search";
import { FaGift } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

interface GiphyResultCardProps {
  result: GiphyResult;
  index: number;
}

const GiphyResultCard: React.FC<GiphyResultCardProps> = ({ result, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <a
        href={result.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-all duration-200 hover:no-underline h-full"
      >
        <Card className="overflow-hidden border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-200 h-full">
          <CardContent className="p-0 flex flex-col h-full">
            <div className="relative overflow-hidden aspect-video bg-gray-100 dark:bg-gray-900">
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                  <div className="animate-pulse h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-700" />
                </div>
              )}

              <Image
                src={result.previewUrl}
                alt={result.title}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoadingComplete={() => setIsLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                <FaGift className="h-3 w-3 text-pink-400" />
                <span>GIPHY</span>
              </div>
            </div>

            <div className="p-3 flex-grow">
              <h3 className="text-sm font-medium line-clamp-2 text-gray-900 dark:text-gray-100 mb-1">
                {result.title || "Untitled GIF"}
              </h3>

              {result.username && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  by @{result.username}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
};

export default GiphyResultCard;
