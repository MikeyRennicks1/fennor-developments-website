import Image from "next/image";

type PageHeroProps = {
  /** 4K high-resolution image URL */
  imageSrc: string;
  imageAlt: string;
  /** Short headline only – off-white, 85–90% opacity */
  headline: string;
  /** object-position so subject (panels, person, landscape) is visible on desktop. e.g. "center 40%" for roof/panels */
  objectPosition?: string;
  /** Optional subline below hairline */
  subline?: string;
  /** Optional: Celtic green hairline (About page) */
  hairlineCeltic?: boolean;
  /** Optional: render CTAs or extra content below hairline */
  children?: React.ReactNode;
};

export function PageHero({
  imageSrc,
  imageAlt,
  headline,
  objectPosition = "center center",
  subline,
  hairlineCeltic = false,
  children,
}: PageHeroProps) {
  return (
    <section
      data-hero="page"
      className="relative w-full min-w-0 overflow-hidden bg-graphite text-center h-[40vh] sm:h-[50vh] lg:h-[60vh]"
      style={{ boxSizing: "border-box" }}
    >
      {/* Image: full bleed, locked to section; overrides in globals.css prevent Preflight height:auto */}
      <div
        className="absolute inset-0 z-0 h-full w-full"
        style={{ position: "absolute" }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          style={{
            objectFit: "cover",
            objectPosition: objectPosition ?? "center center",
          }}
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-hero-overlay" aria-hidden />
      {/* Hero text: max-w-7xl inside full-width section so hero stays full viewport width */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl text-center">
          <h1
            className="text-3xl font-light tracking-wide sm:text-4xl md:text-5xl"
            style={{ color: "#f2f2f0", opacity: 0.88 }}
          >
            {headline}
          </h1>
          <div
            className={`mx-auto mt-4 h-px ${hairlineCeltic ? "w-16 bg-celtic-green/80" : "w-16 bg-[#f2f2f0]/40"}`}
            aria-hidden
          />
          {subline && (
            <p className="mx-auto mt-4 max-w-md text-sm" style={{ color: "rgba(242,242,240,0.8)" }}>
              {subline}
            </p>
          )}
          {children && <div className="mt-10 flex flex-wrap items-center justify-center gap-4">{children}</div>}
        </div>
      </div>
    </section>
  );
}
