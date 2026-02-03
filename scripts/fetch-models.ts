/**
 * Run this script in your child repository's codebase to fetch the models from a repository.
 * 
 * - `npm install p-limit`
 * - `npm install -d @slicemachine/manager`
 * - Define the parent repository in the `SOURCE_REPO` variable.
 * - `npx tsx scripts/fetch-models.ts` (from the child repository)
 */

import { createSliceMachineManager } from "@slicemachine/manager";
import pLimit from "p-limit";

// Parent repository name
const SOURCE_REPO = "prismic-custom-demo"; // Change this to the parent repository name

const manager = createSliceMachineManager();

async function main() {
    const start = performance.now();

    // Ensure that we're logged in before doing anything.
    if (!manager.user.checkIsLoggedIn()) {
        throw new Error("You are not logged in. Please log in first with `npx prismic-cli login` and try again.");
    }

    await manager.plugins.initPlugins();

    // We "trick" the manager into thinking that we're in the parent repository by
    // setting the environment to the parent repository name.
    manager.project.updateEnvironment({ environment: SOURCE_REPO });

    const remoteTypes = await manager.customTypes.fetchRemoteCustomTypes();
    const remoteSlices = await manager.slices.fetchRemoteSlices();

    const createCustomTypeLimit = pLimit(8);

    console.log(`Pulling ${remoteSlices.length} slices and ${remoteTypes.length} types from ${SOURCE_REPO}`);

    let pulledSlices = 0;

    console.log(`Pulling existing slices... (0/${remoteSlices.length})`);
    await Promise.all(
        remoteSlices.map(async (model) => {
            await createCustomTypeLimit(() =>
                manager.slices.createSlice({
                    libraryID: "./slices", // Use one slice library path from the slicemachine.config.json file
                    model: model,
                }),
            );
            pulledSlices++;
            console.log(`Pulling existing slices... (${pulledSlices}/${remoteSlices.length})`);
        }),
    );

    console.log("Pulled existing slices");

    let pulledTypes = 0;

    console.log(`Pulling existing types... (0/${remoteTypes.length})`);
    await Promise.all(
        remoteTypes.map(async (model) => {
            await createCustomTypeLimit(() =>
                manager.customTypes.createCustomType({ model }),
            );
            pulledTypes++;
            console.log(`Pulling existing types... (${pulledTypes}/${remoteTypes.length})`);
        }),
    );

    console.log("Pulled existing types");
    console.log("Synced data with Prismic");

    // Reuse the default environment (main repository)
    await manager.project.updateEnvironment({ environment: undefined });

    console.log("Synced in %os", Math.round((performance.now() - start) / 1000));

}

main();