import { neo4jgraphql } from "neo4j-graphql-js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// set environment variables from ../.env
dotenv.config();
/*
 * Check for GRAPHQL_SCHEMA environment variable to specify schema file
 * fallback to schema.graphql if GRAPHQL_SCHEMA environment variable is not set
 */

const file_path = process.env.GRAPHQL_SCHEMA ? 
  path.join(__dirname, process.env.GRAPHQL_SCHEMA)
  :  path.join(__dirname, "schema.graphql");

export const typeDefs = fs.readFileSync(file_path).toString("utf-8");
