import baseAPI from "./api";
import type {
  SearchResponse,
  SearchService,
  GiphyResult,
} from "@/types/search";

import { FaGift } from "react-icons/fa";

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const GIPHY_API_URL = process.env.GIPHY_API_URL;

interface GiphyAPIResponse {
  data: Array<{
    id: string;
    title: string;
    images: {
      original: {
        url: string;
      };
      fixed_height: {
        url: string;
      };
    };
    user?: {
      username: string;
      display_name: string;
    };
    url: string;
  }>;
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
}

class GiphyService implements SearchService {
  name = "GIPHY";
  icon = FaGift.toString();

  async search(query: string, page = 1): Promise<SearchResponse> {
    try {
      const limit = 10;
      const offset = (page - 1) * limit;

      const response = await baseAPI.get<GiphyAPIResponse>(
        `${GIPHY_API_URL}/v1/gifs/search`,
        {
          params: {
            api_key: GIPHY_API_KEY,
            q: query,
            limit,
            offset,
            rating: "g",
            lang: "en",
          },
        }
      );

      const results: GiphyResult[] = response.data.data.map((item) => ({
        id: item.id,
        title: item.title,
        link: item.url,
        source: "giphy",
        imageUrl: item.images.original.url,
        previewUrl: item.images.fixed_height.url,
        username: item.user?.username || "Anonymous",
      }));

      const {
        total_count,
        count,
        offset: currentOffset,
      } = response.data.pagination;

      return {
        results,
        totalResults: total_count,
        hasMore: currentOffset + count < total_count,
      };
    } catch (error) {
      console.error("Error searching GIPHY:", error);
      return {
        results: [],
        totalResults: 0,
        hasMore: false,
      };
    }
  }
}

export default new GiphyService();
