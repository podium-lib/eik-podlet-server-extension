import { readFile } from "node:fs/promises";
import * as eik from "@eik/esbuild-plugin";

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
 * @param {boolean} [options.development] - Whether the server is running in development mode.
 * @returns {Promise<Object>} The configuration object.
 * @throws {Error} If the eik.json file cannot be read.
 */
export const config = async ({ cwd, development }) => {
  try {
    console.log("🌳 Loading maps from Eik asset server");
    await eik.load({
      path: cwd
    });
  } catch (e) {
    console.error(e);
    throw e;
  }

  try {
    const eik = JSON.parse(
      await readFile(join(cwd, "eik.json"), {
        encoding: "utf8",
      })
    );


    let useLocalFiles = development;
    if (process.env.EIK_DEVELOPMENT === "true") {
      console.log("🌳 EIK_DEVELOPMENT=true – serving local files");
      useLocalFiles = true;
    }

    return {
      assets: {
        base: {
          format: String,
          default: useLocalFiles
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

/**
 * @param {object} options
 * @param {boolean} [options.isClient]
 * @param {boolean} [options.isServer]
 */
export const build = ({ isClient, isServer }) => {
  if (typeof isClient === "undefined" && typeof isServer === "undefined") {
    console.warn("🌳 @podium/eik-podlet-server-extension needs to know the type of build (`isServer` or `isClient`) in order to not break server-side imports. Without it, this build plugin is a no-op.");
    return [];

  }
  if (isClient) {
    console.log("🌳 Running @eik/esbuild-plugin with loaded import maps for the client-side bundle");
    return [eik.plugin()];
  }
  return [];
};
