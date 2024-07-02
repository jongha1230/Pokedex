import { PropsWithChildren } from "react";

function Page({ children }: PropsWithChildren) {
  return <main className="mx-auto text-center px-5 py-20">{children}</main>;
}

export default Page;
