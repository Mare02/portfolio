import Image from "next/image";
import { notFound } from "next/navigation";
import { dictionary, isLocale } from "@/lib/i18n";
import { metadata } from "@/lib/seo";
import { Highlighted, Section, Socials } from "@/components/site/Shared";
import { ScrollIndicator } from "@/components/site/ScrollIndicator";
import { Timeline } from "@/components/site/Timeline";
import skills from "@/data/mySkills.json";
import hero from "@/public/images/hero-guy-coding.png";
import profile from "@/public/images/profile.jpeg";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return metadata(locale, "index", "/");
}
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionary(locale);
  const icons = Object.values(skills)
    .flat()
    .filter((skill) => skill.iconName);
  return (
    <main id="main-content">
      <section className="min-h-screen landing-hero-background grid content-center relative nav-real-padding">
        <div className="container flex flex-col md:flex-row items-center lg:gap-10 px-4 md:px-10 mx-auto">
          <div className="h-fit max-w-4xl font-semibold relative z-10">
            <span className="section-pharagraph">{t.Hello},</span>
            <h1 className="text-6xl sm:text-7xl 2xl:text-8xl break-words max-w-fit gradient-text to-black whitespace-pre-line">
              {t.LandingHero.title}
            </h1>
            <p className="main-section-pharagraph font-semibold pt-5 mb-10">
              <Highlighted text={t.LandingHero.description} />
            </p>
            <Socials />
          </div>
          <div className="max-md:absolute max-md:opacity-20 max-md:inset-0 max-md:h-full max-md:w-full md:w-1/2 shrink-0">
            <Image
              src={hero}
              alt=""
              preload
              sizes="(min-width: 768px) 50vw, 100vw"
              className="max-md:h-full max-md:w-full max-md:object-cover"
            />
          </div>
        </div>
        <ScrollIndicator />
      </section>
      <div className="section-background">
        <div className="container mx-auto px-4 md:px-10">
          <Section id="about" title={t["About me"]}>
            <div className="flex flex-col md:flex-row gap-10 md:gap-20 justify-between">
              <div className="h-fit w-fit shrink-0 max-md:mx-auto rounded-2xl overflow-hidden border-2 border-x-teal-600 border-y-blue-500">
                <Image
                  src={profile}
                  className="w-40 md:w-60 lg:w-80 h-auto"
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 240px, 160px"
                  alt="my profile image"
                />
              </div>
              <div className="max-w-4xl main-section-pharagraph">
                {[
                  t.AboutMe.section1,
                  t.AboutMe.section2,
                  t.AboutMe.section3,
                ].map((text, index) => (
                  <div key={index}>
                    {index > 0 && (
                      <hr className="my-3 border-gray-200 dark:border-slate-700 theme-transition" />
                    )}
                    <p>
                      <Highlighted text={text} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Section>
          <Section title={t["My skills"]}>
            <div>
              <p className="main-section-pharagraph">
                <Highlighted text={t.MySkills.description} />
              </p>
              <div className="mt-10 md:mt-20 w-full">
                <div className="marquee-wrapper">
                  {[0, 1].map((copy) => (
                    <div
                      className="marquee-container shrink-0"
                      key={copy}
                      aria-hidden={copy === 1 ? true : undefined}
                    >
                      {icons.map((skill) => (
                        <div className="marquee-item shrink-0" key={skill.name}>
                          <Image
                            src={`/techLogos/${skill.iconName}`}
                            width={64}
                            height={64}
                            alt={`${skill.name} logo`}
                            className="marquee-item-logo w-auto object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 md:mt-20 flex flex-col sm:flex-row justify-evenly gap-5 md:gap-10 xl:gap-20 mx-auto">
                {Object.entries(skills).map(([category, entries]) => (
                  <div
                    key={category}
                    className={`flex flex-col w-full p-4 md:p-6 rounded-2xl main-section-pharagraph theme-transition ${category === "frontend" ? "bg-green-100 dark:bg-green-900" : category === "backend" ? "bg-blue-100 dark:bg-blue-900" : "bg-blue-50 dark:bg-indigo-900"}`}
                  >
                    <div className="flex items-center gap-5 mb-4 md:mb-6">
                      <h3 className="capitalize font-bold">
                        {t[category as "frontend" | "backend" | "additional"]}
                      </h3>
                      <div className="w-full h-0.5 bg-gray-800 dark:bg-gray-200 theme-transition" />
                    </div>
                    <ul className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-1 gap-1">
                      {entries.map((skill) => (
                        <li key={skill.name}>{skill.name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Section>
          <Section title={t["My experience"]}>
            <Timeline
              key={locale}
              locale={locale}
              now={new Date().toISOString()}
            />
          </Section>
        </div>
      </div>
    </main>
  );
}
