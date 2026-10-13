import { headers } from "next/headers";
import { NotFoundPage } from "@/components/site/NotFound";
export default async function NotFound() {
  return (
    <NotFoundPage
      locale={(await headers()).get("x-site-locale") === "sr" ? "sr" : "en"}
    />
  );
}
