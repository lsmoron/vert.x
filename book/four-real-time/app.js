var container = require('vertx/container');

container.deployModule('io.vertx~mod-web-server~2.0.0-final', {
  port: 8080,
  host: "localhost",
  bridge: true, //http://vertx.io/core_manual_js.html#sockjs-eventbus-bridge 
  inbound_permitted: [
    { address: 'mindMaps.list' },
    { address: 'mindMaps.save' },
    { address: 'mindMaps.delete' },
    { address_re: 'mindMaps\\.editor\\..+' }
  ],
   outbound_permitted: [
    { address_re: 'mindMaps\\.events\\..+' }
  ]  
});

container.deployModule("io.vertx~mod-mongo-persistor~2.0.0-final",{
    address: "mindMaps.persistor",
    db_name: "mind_maps"
  });

container.deployVerticle('mindmaps.js');
container.deployVerticle('mindmap_editor.js');