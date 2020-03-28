# Neo4j Graphql

## Create Full text search index for posts

`CALL db.index.fulltext.createNodeIndex("searchPosts", ["Post"],["title", "content"]);`

- for fuzzy search use ~ and to match rest use \*
