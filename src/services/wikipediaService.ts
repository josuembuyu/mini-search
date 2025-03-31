import baseAPI from "./api";
import type {
  SearchResponse,
  SearchService,
  WikipediaResult,
} from "@/types/search";
import { FaWikipediaW } from "react-icons/fa";

const WIKIPEDIA_API_URL = process.env.NEXT_PUBLIC_WIKIPEDIA_API_URL;
interface WikipediaAPIResponse {
  query: {
    search: Array<{
      pageid: number;
      title: string;
      snippet: string;
      timestamp: string;
    }>;
    searchinfo: {
      totalhits: number;
    };
  };
  continue?: {
    sroffset: number;
  };
}

class WikipediaService implements SearchService {
  name = "Wikipedia";
  icon = FaWikipediaW.toString();

  async search(query: string, page = 1): Promise<SearchResponse> {
    try {
      const limit = 10;
      const offset = (page - 1) * limit;

      const response = await baseAPI.get<WikipediaAPIResponse>(
        `${WIKIPEDIA_API_URL}/w/api.php`,
        {
          params: {
            action: "query",
            list: "search",
            srsearch: query,
            format: "json",
            sroffset: offset,
            srlimit: limit,
            origin: "*",
            prop: "extracts|pageimages",
            exintro: true,
            explaintext: true,
            pithumbsize: 100,
          },
        }
      );

      const results: WikipediaResult[] = response.data.query.search.map(
        (item) => ({
          id: item.pageid.toString(),
          title: item.title,
          link: `${WIKIPEDIA_API_URL}/wiki/${encodeURIComponent(
            item.title.replace(/ /g, "_")
          )}`,
          source: "wikipedia",
          snippet: item.snippet.replace(/<\/?span[^>]*>/g, ""),
        })
      );

      return {
        results,
        totalResults: response.data.query.searchinfo.totalhits,
        hasMore: !!response.data.continue,
      };
    } catch (error) {
      console.error("Error searching Wikipedia:", error);
      return {
        results: [],
        totalResults: 0,
        hasMore: false,
      };
    }
  }
}

const wikipediaService = new WikipediaService();

export default wikipediaService;
