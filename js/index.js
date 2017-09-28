var mouseX = 0, mouseY = 0,

windowHalfX = window.innerWidth / 2,
windowHalfY = window.innerHeight / 2,

SEPARATION = 200,
AMOUNTX = 10,
AMOUNTY = 10,

camera, scene, renderer;

init();
initWater();
animate();

function init() {

  var container;

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.5, 3000000 );
  camera.position.set( 1000, 200, 1000 );

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0xaabbbb, 0.0001 );

  scene.add( new THREE.AmbientLight( 0x444444 ) );

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );

  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart( event ) {
  if ( event.touches.length > 1 ) {
    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}

function onDocumentTouchMove( event ) {
  if ( event.touches.length == 1 ) {
    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  camera.position.x += ( mouseX - 1000 - camera.position.x );
  camera.position.y += ( - mouseY + 500 - camera.position.y );
  camera.lookAt( scene.position );

  water.material.uniforms.time.value += 1.0 / 60.0;
  water.render();
  animateBall();

  renderer.render( scene, camera );
}