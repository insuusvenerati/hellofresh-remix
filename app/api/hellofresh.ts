import { HELLOFRESH_SEARCH_URL } from "~/constants";
import type { RecipeQuery } from "~/types/recipes";

type HelloFreshSearchOptions = {
  page?: number;
  tag?: string;
  maxPrepTime?: number;
  difficulty?: number;
  take?: number;
  order?: string;
  cuisine?: string;
};

export const hellofreshGetToken = async () => {
  const token = await fetch(
    "https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials",
    {
      method: "POST",
    }
  );

  return token;
};

export const hellofreshSearch = async (
  searchText: string,
  options?: HelloFreshSearchOptions
) => {
  const { page = 1, tag, maxPrepTime, difficulty, take = 20 } = options || {};
  return await fetch(`${HELLOFRESH_SEARCH_URL}?page=${page}&q=${searchText}`);
};

export const hellofreshSearchBySlug = async ({
  slug,
}: {
  slug: string | string[] | undefined;
}) => {
  if (!slug || typeof slug !== "string") {
    return await Promise.reject(new Error("Invalid recipe slug was provided"));
  }

  const response = await fetch(`${HELLOFRESH_SEARCH_URL}/recipe?q=${slug}`);

  if (!response.ok) {
    return await Promise.reject(new Error("Getting recipe failed"));
  }

  return (await response.json()) as RecipeQuery;
};
