/**
 * SEO descriptions for each gallery image. Key = exact filename from public/gallery/.
 * Replace placeholders with real descriptions after viewing each photo.
 * Include: solar panels, roof type (slate, tile, flat), inverters, batteries,
 * fireman switches, EDDI hot water diverters, EV chargers, location (Meath, Dublin, etc.).
 * When you add new photos to public/gallery/, add a new entry here with the exact filename.
 */

export type GalleryDescription = {
  description: string;
  category?: "solar-panels" | "inverter" | "battery" | "ev-charger" | "eddi" | "fireman-switch" | "consumer-unit" | "installation";
};

export const GALLERY_DESCRIPTIONS: Record<string, GalleryDescription> = {
  "0E24FA0D-24D5-45D3-8CEF-1F7C77F19C3F.JPG": {
    description: "Solar PV installation by Fennor Developments – solar panels and inverter, Meath.",
    category: "solar-panels",
  },
  "152a876c-7c68-4349-8638-0976fb5bd454.jpg": {
    description: "Solar panels on Irish roof – Fennor Developments solar installation, Meath.",
    category: "solar-panels",
  },
  "18cb7ef7-6139-40a2-9321-638520e83f15.jpg": {
    description: "Hybrid inverter and battery storage installation – domestic solar PV, Fennor Developments.",
    category: "inverter",
  },
  "25b62b6d-ef77-4a4b-81e8-bcba8de7db53.jpg": {
    description: "Solar panel array on roof – Fennor Developments solar installation, Ireland.",
    category: "solar-panels",
  },
  "39d3ec36-b6f2-4477-b1b0-0825c7e82e96.jpg": {
    description: "Inverter and electrical installation – solar PV system by Fennor Developments.",
    category: "inverter",
  },
  "4148D47E-ADC4-4A7D-A731-2369327DAE5B.JPG": {
    description: "Solar panels and inverter installation – Fennor Developments, Meath.",
    category: "solar-panels",
  },
  "540b215e-2c61-45d5-9d81-ed70bae8401b.JPG": {
    description: "Solar PV on roof with hybrid inverter – Fennor Developments installation.",
    category: "solar-panels",
  },
  "546B1F49-D6F7-4421-B280-4E72186FC16C.JPG": {
    description: "Battery storage and inverter for solar – domestic installation, Fennor Developments.",
    category: "battery",
  },
  "5ef3ac05-f43c-4251-8b48-d6ae69a77a89.jpg": {
    description: "Solar panel installation – Fennor Developments solar PV, Ireland.",
    category: "solar-panels",
  },
  "64d86977-080e-4d1d-9f4e-a92ba74ede73.JPG": {
    description: "Inverter and fireman switch installation – solar PV compliance, Fennor Developments.",
    category: "fireman-switch",
  },
  "701cb181-471b-460a-a597-47d5747746be.JPG": {
    description: "Solar inverter and battery storage – Fennor Developments domestic solar PV installation, Meath.",
    category: "inverter",
  },
  "9b052b60-22c8-4542-94ee-99e54eff97f6.jpg": {
    description: "Solar panels on roof – Fennor Developments solar installation.",
    category: "solar-panels",
  },
  "9f9428cb-7e29-4db9-bc4a-07e02b7023c4.jpg": {
    description: "EDDI hot water diverter with solar PV – maximise solar for hot water, Fennor Developments.",
    category: "eddi",
  },
  "A53CB3FB-BD49-44EB-B7B3-F0A3A1122254.JPG": {
    description: "Solar PV installation – panels and inverter, Fennor Developments Ireland.",
    category: "solar-panels",
  },
  "A559528E-E693-4EBE-A224-6899F2A7A564.JPG": {
    description: "EV charger installation with solar – charge from solar, Fennor Developments.",
    category: "ev-charger",
  },
  "IMG_0103_VSCO.JPG": {
    description: "Solar panel installation on roof – Fennor Developments solar PV, Meath.",
    category: "solar-panels",
  },
  "IMG_0110_VSCO.JPG": {
    description: "Solar installation – inverter and panels, Fennor Developments.",
    category: "installation",
  },
  "IMG_0114_VSCO.JPG": {
    description: "Solar PV and electrical work – Fennor Developments installation.",
    category: "solar-panels",
  },
  "IMG_6825.JPG": {
    description: "Solar panels and inverter – domestic solar installation by Fennor Developments, Ireland.",
    category: "solar-panels",
  },
  "af183ae2-2f8b-4e90-9e3d-d6e24379ddc8.JPG": {
    description: "Hybrid inverter installation – solar PV system, Fennor Developments.",
    category: "inverter",
  },
  "b69fab46-e6ad-43a1-af45-86d856f768c4.JPG": {
    description: "Battery storage and solar inverter – Fennor Developments domestic solar, Meath.",
    category: "battery",
  },
  "c1bd7f35-cd14-4fc4-a9f2-02820b6f9072.JPG": {
    description: "Solar panels on roof – Fennor Developments PV installation.",
    category: "solar-panels",
  },
  "c583636c-c793-4a1c-8166-127d4c5aea2f.jpg": {
    description: "Consumer unit and solar inverter – electrical installation, Fennor Developments.",
    category: "consumer-unit",
  },
  "c6d391e0-22d6-4ef4-833b-caeeb05002a8.JPG": {
    description: "Solar PV installation with inverter – Fennor Developments, Ireland.",
    category: "solar-panels",
  },
  "c7e28de5-bd0c-44d6-82a7-70b729d254ba.jpg": {
    description: "Solar panels and battery – Fennor Developments solar installation.",
    category: "solar-panels",
  },
  "d6528e7e-91cd-4ed2-8552-7310b393d04e.jpg": {
    description: "Inverter and fireman switch – solar PV installation, Fennor Developments.",
    category: "fireman-switch",
  },
  "e3ee1f7d-afc9-41eb-9735-4833bc81143b.jpg": {
    description: "Solar panel array – Fennor Developments solar PV on Irish roof.",
    category: "solar-panels",
  },
  "e6a06bb8-889f-4a9c-95ce-879532be3b32.JPG": {
    description: "EDDI hot water diverter with solar – Fennor Developments installation.",
    category: "eddi",
  },
};
