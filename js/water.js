var water, sphere;
var parameters = {
  width: 2000,
  height: 2000,
  widthSegments: 250,
  heightSegments: 250,
  depth: 1500,
  param: 4,
  filterparam: 1
};
var waterNormals;

function initWater() {
  waterNormals = new THREE.TextureLoader().load( 'textures/waternormals.jpg' );
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  var light = new THREE.DirectionalLight( 0xffffbb, 1 );
  light.position.set( - 1, 1, - 1 );
  scene.add( light );

  water = new THREE.Water( renderer, camera, scene, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: waterNormals,
    alpha:  1.0,
    sunDirection: light.position.clone().normalize(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 50.0,
    fog: scene.fog != undefined
  } );

  var mirrorMesh = new THREE.Mesh(
    new THREE.PlaneBufferGeometry( parameters.width * 500, parameters.height * 500 ),
    water.material
    );


  mirrorMesh.add( water );
  mirrorMesh.rotation.x = - Math.PI * 0.5;
  scene.add( mirrorMesh );

  var cubeMap = new THREE.CubeTexture( [] );
  cubeMap.format = THREE.RGBFormat;
  var loader = new THREE.ImageLoader();
  loader.load( 'textures/skyboxsun25degtest.png', function ( image ) {
    var getSide = function ( x, y ) {
      var size = 1024;
      var canvas = document.createElement( 'canvas' );
      canvas.width = size;
      canvas.height = size;
      var context = canvas.getContext( '2d' );
      context.drawImage( image, - x * size, - y * size );
      return canvas;
    };
    cubeMap.images[ 0 ] = getSide( 2, 1 ); 
    cubeMap.images[ 1 ] = getSide( 0, 1 ); 
    cubeMap.images[ 2 ] = getSide( 1, 0 ); 
    cubeMap.images[ 3 ] = getSide( 1, 2 ); 
    cubeMap.images[ 4 ] = getSide( 1, 1 ); 
    cubeMap.images[ 5 ] = getSide( 3, 1 ); 
    cubeMap.needsUpdate = true;
  } );

  var cubeShader = THREE.ShaderLib[ 'cube' ];
  cubeShader.uniforms[ 'tCube' ].value = cubeMap;

  var skyBoxMaterial = new THREE.ShaderMaterial( {
    fragmentShader: cubeShader.fragmentShader,
    vertexShader: cubeShader.vertexShader,
    uniforms: cubeShader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  });

  var skyBox = new THREE.Mesh(
    new THREE.BoxGeometry( 1000000, 1000000, 1000000 ),
    skyBoxMaterial
    );

  scene.add( skyBox );

  var geometry = new THREE.IcosahedronGeometry( 400, 4 );
  for ( var i = 0, j = geometry.faces.length; i < j; i ++ ) {
    geometry.faces[ i ].color.setHex( Math.random() * 0xffffff );
  }
  var material = new THREE.MeshPhongMaterial( {
    vertexColors: THREE.FaceColors,
    shininess: 100,
    envMap: cubeMap
  } );
  
  sphere = new THREE.Mesh( geometry, material );
  scene.add( sphere );
}