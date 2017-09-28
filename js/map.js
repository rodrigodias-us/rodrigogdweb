var map;

function initMap() {
  var loader = new THREE.JSONLoader();

  loader.load('obj/Map.json', function(geometry, materials) {
    console.log(geometry);
    map = new THREE.Mesh(geometry, materials);
    map.scale.set(200,200,200);
    map.position.set(0, 100, 0);
    scene.add(map);
  });
}