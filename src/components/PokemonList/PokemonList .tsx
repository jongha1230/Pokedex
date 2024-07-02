"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useFetchPokemons } from "../hooks/useFetchPokemons";

function PokemonList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchPokemons();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // 모든 페이지의 포켓몬을 하나의 리스트로 병합
  const allPokemons = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {allPokemons.map((pokemon: Pokemon) => (
          <Link key={pokemon.id} href={`pokemon/${pokemon.id}`}>
            <li className="flex flex-col items-center p-2 border rounded border-white">
              <div className="relative aspect-square w-[96px] mb-2">
                <Image
                  alt={pokemon.korean_name}
                  src={pokemon.sprites.front_default}
                  fill
                  className="object-cover"
                />
              </div>
              <h6 className="text-center">{pokemon.korean_name}</h6>
              <p className="text-center">{`도감 번호: ${pokemon.id}`}</p>
            </li>
          </Link>
        ))}
      </ul>
      <div ref={ref} className="text-center mt-4">
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "No more data"}
      </div>
    </div>
  );
}

export default PokemonList;
