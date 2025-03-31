"use client";

import type React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { services } from "@/services";
import { useSearch } from "@/context/SearchContext";
import { FaStackOverflow, FaWikipediaW, FaGift } from "react-icons/fa";
import { motion } from "framer-motion";

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case FaStackOverflow.toString():
      return <FaStackOverflow className="mr-2 h-4 w-4" />;
    case FaWikipediaW.toString():
      return <FaWikipediaW className="mr-2 h-4 w-4" />;
    case FaGift.toString():
      return <FaGift className="mr-2 h-4 w-4" />;
    default:
      return null;
  }
};

const ServiceTabs: React.FC = () => {
  const { selectedSource, setSelectedSource, performSearch, query, setPage } =
    useSearch();

  const handleSourceChange = (value: string) => {
    const newSource = value === "all" ? null : value.toLowerCase();
    setSelectedSource(newSource);
    setPage(1);

    if (query) {
      performSearch(query, newSource, 1);
    }
  };

  return (
    <motion.div
      className="w-full max-w-xl mx-auto mt-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Tabs
        defaultValue="all"
        value={selectedSource || "all"}
        onValueChange={handleSourceChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger
            value="all"
            className="flex items-center justify-center text-sm font-normal"
          >
            All Services
          </TabsTrigger>

          {services.map((service) => (
            <TabsTrigger
              key={service.name.toLowerCase()}
              value={service.name.toLowerCase()}
              className="flex items-center justify-center text-sm font-normal"
            >
              {getIconComponent(service.icon)}
              {service.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </motion.div>
  );
};

export default ServiceTabs;
