"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPokemons = async (page: number): Promise<PokemonResponse> => {
  const { data } = await axios.get(`/api/pokemons?page=${page}`);
  return data;
};

export const useFetchPokemons = () => {
  return useInfiniteQuery<
    PokemonResponse,
    Error,
    InfiniteData<PokemonResponse>,
    string[],
    number
  >({
    queryKey: ["pokemon"],
    queryFn: ({ pageParam = 1 }) => fetchPokemons(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
      return undefined;
    },
  });
};
