"use client"
import { navigateTo } from "@/utils/router";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    navigateTo(router, '/places')
  }, [])

  return (
    <h1>Travel Planner</h1>
  );
}
