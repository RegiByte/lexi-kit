## Stubs

This directory contains stub files that are used during the build process to
use a different tsconfig during the build.

The stubs are used to make the local packages target the right directory during development.

During the build we copy the `tsconfig.production.json` to `tsconfig.json`.

After the build we copy the `tsconfig.dev.json` back to `tsconfig.json`.

This is done to make sure that the local packages target the right directory during development.

## Making changes

If you need to make changes to the tsconfig make sure to make the changes to the stub files and not only the actual tsconfig files.

### Modifying base settings

If you need to modify the base settings of the tsconfig make sure to modify the `tsconfig.base.json` file in the root directory.
