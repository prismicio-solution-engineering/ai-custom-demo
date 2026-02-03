/**
 * Use Slice Machine UI to push your models to the main repository
 * Then run this script to push the models to the child repositories.
 * 
 * - `npm install -d @slicemachine/manager`
 * - Configure child repositories in the `SUB_REPOSITORIES` array.
 * - `npx tsx push-models.ts`
 */

import { createSliceMachineManager } from "@slicemachine/manager";

// Repositories that where models will be replicated.
const SUB_REPOSITORIES = [
  "child-repo-name-1",
  // "child-repo-name-2",
  // ...
]

const manager = createSliceMachineManager();

async function main() {
  const start = performance.now();

  // Ensure that we're logged in.
  if (!manager.user.checkIsLoggedIn()) {
    throw new Error("You are not logged in. Please log in first with `npx prismic-cli login` and try again.");
  }

  await manager.plugins.initPlugins();

  const { models: slices } = await manager.slices.readAllSlices();
  const { models: customtypes } = await manager.customTypes.readAllCustomTypes();

  console.log(
    "Syncing %o slices and %o custom types to %o sub-repositories",
    slices.length,
    customtypes.length,
    SUB_REPOSITORIES.length
  );

  for (let i = 0; i < SUB_REPOSITORIES.length; i++) {
    const sub = SUB_REPOSITORIES[i];
    let progress = 0;

    const logProgress = (progressed?: boolean) => {
      if (progressed) {
        progress++;
        // Clean up last progress line
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine(1);
      }

      console.log(
        "Syncing %o... %o% (%o/%o)",
        sub,
        Math.floor(progress / (slices.length + customtypes.length) * 100),
        i + 1,
        SUB_REPOSITORIES.length
      );
    }

    logProgress();

    // We "trick" the manager into thinking that we're in a sub-repository by
    // setting the environment to the sub-repository name.
    await manager.project.updateEnvironment({ environment: sub });

    await manager.screenshots.initS3ACL();

    await Promise.all(slices.map(async (slice) => {
      await manager.slices.pushSlice({ libraryID: slice.libraryID, sliceID: slice.model.id });
      logProgress(true);
    }))

    await Promise.all(customtypes.map(async (customtype) => {
      await manager.customTypes.pushCustomType({ id: customtype.model.id });
      logProgress(true);
    }))
  }

  // Reuse the default environment (main repository)
  await manager.project.updateEnvironment({ environment: undefined });

  console.log("Synced in %os", Math.round((performance.now() - start) / 1000));
}

main();
