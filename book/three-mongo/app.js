var container = require('vertx/container');
container.deployModule('io.vertx~mod-web-server~2.0.0-final', {
  port: 8080,
  host: "localhost",
  bridge: true, //http://vertx.io/core_manual_js.html#sockjs-eventbus-bridge 
  inbound_permitted: [
    { address: 'mindMaps.list' },
    { address: 'mindMaps.save' },
    { address: 'mindMaps.delete' }
  ]  
});

container.deployModule("io.vertx~mod-mongo-persistor~2.0.0-final",{
    address: "mindMaps.persistor",
    db_name: "mind_maps"
  });

container.deployVerticle('mindmaps.js');