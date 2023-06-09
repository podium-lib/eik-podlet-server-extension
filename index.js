import { readFile } from "node:fs/promises";

const join = (...segments) => {
  return segments.join("/").replace(/[\/]+/g, "/");
};

export const config = async ({ cwd, development }) => {
  try {
    const eik = JSON.parse(
      await readFile(join(cwd, "eik.json"), {
        encoding: "utf8",
      })
    );

    return {
      assets: {
        base: {
          format: String,
          default: development
            ? "/static"
            : new URL(join("pkg", eik.name, eik.version), eik.server).href,
        },
      },
    };
  } catch (error) {
    throw new Error("Could not read eik.json, Is there one present in the project root?");
  }
};
