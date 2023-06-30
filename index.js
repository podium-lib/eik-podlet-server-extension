import { readFile } from "node:fs/promises";

/**
 * Joins path segments into a single path string.
 *
 * @param {...string} segments - The path segments to join.
 * @returns {string} The joined path string.
 */
const join = (...segments) => {
  return segments.join("/").replace(/[\/]+/g, "/");
};

/**
 * Returns the configuration object for the eik-podlet-server-extension.
 *
 * @param {Object} options - The options object.
 * @param {string} options.cwd - The current working directory.
 * @param {boolean} options.development - Whether the server is running in development mode.
 * @returns {Promise<{
 *   assets: {
 *     base: {
 *       format: string;
 *       default: string;
 *     };
 *   };
 * }>} The configuration object.
 * @throws {Error} If the eik.json file cannot be read.
 */
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
          format: "string",
          default: development
            ? "/static"
            : new URL(join("pkg", eik.name, eik.version), eik.server).href,
        },
      },
    };
  } catch (error) {
    throw new Error(
      "Could not read eik.json, Is there one present in the project root?"
    );
  }
};
