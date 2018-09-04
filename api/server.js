const Hapi = require('hapi');
const { configureRoutes } = require('./src/routes');

const server = Hapi.server({
  host: '0.0.0.0',
  port: 3000,
  routes: {
    cors: true,
  }
});

const main = async() => {
  await configureRoutes(server);
  await server.start();

  return server;
}

main().then(server => {
  console.log(`Server running at ${server.info.uri}`);
}).catch(err => {
  console.log(err);
  process.exit(1);
});
