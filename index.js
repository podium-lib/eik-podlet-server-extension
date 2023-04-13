import { join } from "node:path";
import { readFile } from "node:fs/promises";

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
            : join(eik.server, "pkg", eik.name, eik.version),
        },
      },
    };
  } catch (error) {
    throw new Error("Could not read eik.json, Is there one present in the project root?");
  }
};
