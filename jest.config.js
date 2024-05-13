/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./jsconfig.json";

/** @type {import('ts-jest').JestConfigWithTsJest} */
export const preset = "ts-jest";
export const modulePaths = [compilerOptions.baseUrl];
export const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths);
export const roots = ["lib"];