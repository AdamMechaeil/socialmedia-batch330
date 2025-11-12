"use client";
import dynamic from "next/dynamic";
const NOSSR = dynamic(
  () => {
    return import("./Components/Home/Main");
  },
  { ssr: false }
);
export default function Home() {
  return (
    <>
      <div className="border-8 border-amber-400 p-[50px]">
        <NOSSR />
      </div>
    </>
  );
}
