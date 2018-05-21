#!/usr/bin/env node

import { resolve } from "path";
import * as shell from "shelljs";
import * as yargs from "yargs";
import { PackageConfig } from "~/types";

const packages: string[] = yargs.array("packages").argv.packages;

if (typeof process.env.LERNA_PACKAGE_NAME === "string" && packages.indexOf(process.env.LERNA_PACKAGE_NAME) !== -1) {
  const packagePath = resolve(process.cwd(), "package.json");
  const { version }: PackageConfig = require(packagePath);
  shell.exec(`yarn publish --new-version ${version}`);
}
