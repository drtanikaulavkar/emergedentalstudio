import {createClient} from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "el8er4wl";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-27";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Set SANITY_API_WRITE_TOKEN before running this verification.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false
});

function findMissingArrayKeys(value, path = []) {
  const missing = [];

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      const itemPath = [...path, `[${index}]`];
      if (item && typeof item === "object" && !Array.isArray(item)) {
        if (typeof item._key !== "string" || item._key.length === 0) {
          missing.push(itemPath.join(".").replaceAll(".[", "["));
        }
        missing.push(...findMissingArrayKeys(item, itemPath));
      }
    });
    return missing;
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, child]) => {
      missing.push(...findMissingArrayKeys(child, [...path, key]));
    });
  }

  return missing;
}

const documents = await client.fetch(
  `*[_type in ["siteSettings", "page", "service"]]{
    _id,
    _type,
    hours,
    testimonials,
    sections
  }`
);

const failures = documents.flatMap((document) =>
  findMissingArrayKeys(document).map((path) => `${document._id} (${document._type}): ${path}`)
);

if (failures.length) {
  console.error(`Missing _key values in ${failures.length} array item(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("All Sanity array object items have _key values.");
