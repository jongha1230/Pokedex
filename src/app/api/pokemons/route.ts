import axios from "axios";
import { NextResponse } from "next/server";

const TOTAL_POKEMON = 151;
const POKEMON_PER_PAGE = 20;

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const start = (page - 1) * POKEMON_PER_PAGE;
    const end = Math.min(start + POKEMON_PER_PAGE, TOTAL_POKEMON);

    const pokemonPromises = Array.from({ length: end - start }, (_, index) => {
      const id = start + index + 1;
      return Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
      ]);
    });

    const pokemonResponses = await Promise.all(pokemonPromises);

    const pokemonData = pokemonResponses.map(([response, speciesResponse]) => {
      const koreanName = speciesResponse.data.names.find(
        (name: any) => name.language.name === "ko"
      );
      return { ...response.data, korean_name: koreanName?.name || null };
    });

    return NextResponse.json({
      results: pokemonData,
      page,
      total_pages: Math.ceil(TOTAL_POKEMON / POKEMON_PER_PAGE),
      total_results: TOTAL_POKEMON,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
