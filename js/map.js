var map;

function initMap() {
  var loader = new THREE.JSONLoader();

  loader.load('obj/Map.json', function(geometry) {
    map = new THREE.Mesh(geometry);
    scene.add(map);
  });
}