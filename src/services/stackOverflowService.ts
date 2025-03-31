import baseAPI from "./api";
import type {
  SearchResponse,
  SearchService,
  StackOverflowResult,
} from "@/types/search";
import { FaStackOverflow } from "react-icons/fa";

const STACK_OVERFLOW_API_URL = process.env.NEXT_PUBLIC_STACK_OVERFLOW_API_URL;

interface StackOverflowAPIResponse {
  items: Array<{
    question_id: number;
    title: string;
    link: string;
    answer_count: number;
    is_answered: boolean;
    score: number;
    tags: string[];
    creation_date: number;
  }>;
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
  total: number;
}

class StackOverflowService implements SearchService {
  name = "Stack Overflow";
  icon = FaStackOverflow.toString();

  async search(query: string, page = 1): Promise<SearchResponse> {
    try {
      const response = await baseAPI.get<StackOverflowAPIResponse>(
        `${STACK_OVERFLOW_API_URL}/search`,
        {
          params: {
            order: "desc",
            sort: "activity",
            site: "stackoverflow",
            intitle: query,
            page,
            pagesize: 10,
          },
        }
      );

      const results: StackOverflowResult[] = response.data.items.map(
        (item) => ({
          id: item.question_id.toString(),
          title: item.title,
          link: item.link,
          source: "stackoverflow",
          answerCount: item.answer_count,
          isAnswered: item.is_answered,
          score: item.score,
          tags: item.tags,
          creationDate: item.creation_date,
        })
      );

      return {
        results,
        totalResults: response.data.total,
        hasMore: response.data.has_more,
      };
    } catch (error) {
      console.error("Error searching Stack Overflow:", error);
      return {
        results: [],
        totalResults: 0,
        hasMore: false,
      };
    }
  }
}

export default new StackOverflowService();
