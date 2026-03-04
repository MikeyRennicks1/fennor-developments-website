/**
 * Solar installation testimonials for the gallery page.
 * Shown in a separate section below the main gallery. Each has a photo, customer name, short description and quote.
 */

export type SolarTestimonial = {
  name: string;
  location: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  quote: string;
};

export const SOLAR_TESTIMONIALS: SolarTestimonial[] = [
  {
    name: "Pat and Mary Doyle",
    location: "Navan",
    description: "10-panel system with hybrid inverter. Slate roof, one-day install.",
    imageSrc: "/gallery/4148D47E-ADC4-4A7D-A731-2369327DAE5B.JPG",
    imageAlt: "10-panel solar array on roof – Fennor Developments, Navan",
    quote: "Straightforward from start to finish. We got the SEAI grant and the app shows exactly what we're generating. Very happy with it.",
  },
  {
    name: "James and Sarah Reilly",
    location: "Trim",
    description: "4.2 kWp solar PV and battery. Bungalow, south-facing.",
    imageSrc: "/gallery/A53CB3FB-BD49-44EB-B7B3-F0A3A1122254.JPG",
    imageAlt: "8-panel solar array on residential roof – Fennor Developments, Trim",
    quote: "They turned up when they said they would and left the place spotless. The battery means we use most of what we generate. Would recommend.",
  },
  {
    name: "Tom and Anne Byrne",
    location: "Duleek",
    description: "Full rewire of the extension and solar install. 16 panels, hybrid inverter.",
    imageSrc: "/gallery/c6d391e0-22d6-4ef4-833b-caeeb05002a8.JPG",
    imageAlt: "16-panel solar array, hybrid inverter – Fennor Developments, Duleek",
    quote: "We added on an extension and weren't sure how to add solar into the build. Fennor did the full rewire for the extension and took us through the solar side from start to finish—they helped us with the grant paperwork and the install was smooth. Really pleased with how it turned out.",
  },
  {
    name: "Michael Rodgers",
    location: "Ashbourne",
    description: "6.9 kW system with monitoring. New build, solar-ready from day one.",
    imageSrc: "/gallery/IMG_6825.JPG",
    imageAlt: "6.9 kW solar roof array – Fennor Developments, Ashbourne",
    quote: "Got Fennor in to do the solar. They were in and out in a day, and the app shows you what you're generating. Would recommend.",
  },
];
