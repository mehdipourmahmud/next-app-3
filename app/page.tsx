"use client"
import Categories from "@/components/Categories";
import { getCurrentUser } from "@/libs/session";
import { useRouter } from "next/navigation";

export default function Home() {

  return (
    <div>
    <Categories/>
    </div>
  )
}
