"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

function BackButton({ children }: PropsWithChildren) {
  const router = useRouter();
  return (
    <button
      type="button"
      className="bg-blue-500 px-4 py-2 text-white rounded font-semibold hover:brightness-90 active:brightness-75"
      onClick={() => {
        router.back();
      }}
    >
      {children}
    </button>
  );
}

export default BackButton;
