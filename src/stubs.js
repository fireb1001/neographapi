import { ApolloServer } from "apollo-server-express";
import express from "express";
import neo4j from "neo4j-driver";
import { makeAugmentedSchema } from "neo4j-graphql-js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// set environment variables from ../.env
dotenv.config();
/*
 * Check for GRAPHQL_SCHEMA environment variable to specify schema file
 * fallback to schema.graphql if GRAPHQL_SCHEMA environment variable is not set
 */

const file_path = path.join(__dirname, "stubs.graphql");

const typeDefs = fs.readFileSync(file_path).toString("utf-8");

// set environment variables from ../.env
dotenv.config();

const app = express();

const schema = makeAugmentedSchema({
  typeDefs
});

const driver = neo4j.driver(
  process.env.NEO4J_URI || "bolt://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_USER || "neo4j",
    process.env.NEO4J_PASSWORD || "neo4j"
  )
);

const server = new ApolloServer({
  context: { driver },
  schema: schema,
  introspection: true,
  playground: true
});

// Specify port and path for GraphQL endpoint
const port = 4100;
const gqlpath = "/graphql";

server.applyMiddleware({ app, gqlpath });

app.listen({ port, gqlpath }, () => {
  console.log(`GraphQL server ready at http://localhost:${port}${gqlpath}`);
});
