import "server-only";
import { cache } from "react";
import type { Project, SanityImage } from "./types";

// Same public project and dataset as the existing Sanity Studio. Existing env names remain supported.
const projectId = process.env.SANITY_PROJECT_ID || "bmfvsnwe";
const dataset = process.env.SANITY_DATASET || "production";
if (!/^[a-z0-9-]+$/.test(projectId) || !/^[a-zA-Z0-9_-]+$/.test(dataset))
  throw new Error("Invalid Sanity project or dataset");

async function query<T>(
  groq: string,
  params: Record<string, string> = {},
): Promise<T> {
  const url = new URL(
    `https://${projectId}.apicdn.sanity.io/v2025-06-01/data/query/${dataset}`,
  );
  url.searchParams.set("query", groq);
  url.searchParams.set("perspective", "published");
  for (const [key, value] of Object.entries(params))
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  const response = await fetch(url, {
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok)
    throw new Error(`Sanity request failed (${response.status})`);
  const body = await response.json();
  if (body.error) throw new Error("Sanity query failed");
  return body.result as T;
}
export const getAllProjects = cache(() =>
  query<Project[]>(
    '*[_type == "project"] | order(coalesce(createdAt, _createdAt) desc) { _id, name, description, slug, websiteUrl, sourceCodeUrl, coverImage, "images": images[defined(asset._ref)][0..0] }',
  ),
);
export const getProjectBySlug = cache((slug: string) =>
  query<Project | null>(
    '*[_type == "project" && slug.en.current == $slug][0]',
    { slug },
  ),
);
export function sanityImageUrl(
  image: SanityImage | undefined,
): string | undefined {
  const ref = image?.asset?._ref;
  const match = ref?.match(/^image-([a-zA-Z0-9]+)-(\d+x\d+)-([a-zA-Z0-9]+)$/);
  return match
    ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${match[1]}-${match[2]}.${match[3]}`
    : undefined;
}
export function projectCoverUrl(project: Project): string | undefined {
  return (
    sanityImageUrl(project.coverImage) ||
    project.images?.map(sanityImageUrl).find((url) => !!url)
  );
}
