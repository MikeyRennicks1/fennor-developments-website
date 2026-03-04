import Link from "next/link";
import type { SolarLocation } from "@/config/solar-locations-full";

type SolarAreasGridProps = {
  countyLabel: string;
  towns: SolarLocation[];
};

/** Grid of Solar Panels [Town] links for county hub pages – internal linking for SEO. */
export function SolarAreasGrid({ countyLabel, towns }: SolarAreasGridProps) {
  if (!towns.length) return null;
  return (
    <div className="mt-12 pt-10 border-t border-gray-200/80">
      <h2 className="text-xl font-medium text-slate mb-4">
        Solar panels in {countyLabel} – areas we cover
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        We install solar PV and battery storage across {countyLabel}. Select your area for local information and a free quote.
      </p>
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {towns.map((loc) => (
          <li key={loc.slug}>
            <Link href={`/solar-panels-${loc.slug}`} className="text-accent hover:text-accent-light font-medium">
              Solar Panels {loc.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
