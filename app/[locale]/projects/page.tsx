import { notFound } from "next/navigation";
import { isLocale, dictionary } from "@/lib/i18n";
import { metadata } from "@/lib/seo";
import { getAllProjects, sanityImageUrl } from "@/lib/sanity";
import { Container } from "@/components/site/Shared";
import { Projects } from "@/components/site/Projects";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return metadata(locale, "projects", "/projects");
}
export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const projects = await getAllProjects();
  return (
    <Container className="nav-top-padding pb-20">
      <h1 className="section-title mb-6 md:mb-8">
        {dictionary(locale)["My projects"]}
      </h1>
      <Projects
        locale={locale}
        projects={projects.map((project) => ({
          project,
          image: sanityImageUrl(project.images?.[0] || project.coverImage),
        }))}
      />
    </Container>
  );
}
