"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BackButton from "../Button/Button";
import { padNumberToFourDigits } from "../util/padNumberToFourDigits";

type PokemonDetailProps = {
  pokemon: Pokemon;
};

function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className="grid h-screen place-items-center text-black">
      <div className="flex flex-col justify-between items-center bg-white w-1/3 h-3/4 gap-2 overflow-auto">
        <div className="bg-gray-200 w-full h-18 text-center">
          <h2 className=" font-bold text-xl py-2.5">{pokemon.korean_name}</h2>
          <h6 className="font-semibold pb-2.5 text-sm">{`No. ${padNumberToFourDigits(
            pokemon.id
          )}`}</h6>
        </div>
        <div className="relative w-[96px] h-[96px]">
          <Image
            alt={pokemon.korean_name}
            src={pokemon.sprites.front_default}
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
        <h6 className="font-[650] text-md mb-2">{`이름: ${pokemon.korean_name}`}</h6>
        <div className="flex gap-2.5">
          <p className="font-medium text-md">{`키: ${(
            pokemon.height * 0.1
          ).toFixed(1)} m`}</p>
          <p className="font-medium text-md">{`무게: ${(
            pokemon.weight * 0.1
          ).toFixed(1)} kg`}</p>
        </div>
        <div className="flex gap-2 my-2">
          <div className="flex items-center gap-2">
            타입:
            {pokemon.types.map((type) => (
              <div
                key={type.type.korean_name}
                className="rounded bg-orange-500 text-white text-center px-2.5 py-0.5"
              >
                {type.type.korean_name}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            특성:
            {pokemon.abilities.map((ability) => (
              <div
                key={ability.ability.korean_name}
                className="rounded bg-green-500 text-white text-center px-2.5 py-0.5"
              >
                {ability.ability.korean_name}
              </div>
            ))}
          </div>
        </div>
        <p>기술:</p>
        <div className="text-center px-4 break-words break-keep mb-4">
          {pokemon.moves.map((move) => (
            <span key={move.move.korean_name}>{move.move.korean_name} </span>
          ))}
        </div>
        <div className="mb-2">
          <BackButton>뒤로 가기</BackButton>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
