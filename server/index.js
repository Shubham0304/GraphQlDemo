const {ApolloServer} = require("@apollo/server");
const { startStandaloneServer } = require('@apollo/server/standalone');
const {typeDefs} = require('./schema/type-defs');
const {resolvers} = require('./schema/resolvers');





const server = new ApolloServer({typeDefs, resolvers});

(async () => {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
  
    console.log(`🚀 Server ready at ${url}`);
  })();


