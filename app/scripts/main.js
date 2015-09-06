// jshint devel:true
"use strict";

//======TERMINAL=======
var terminal = new Terminal('terminal', {
            welcome: 'Hey, Welcome to my web terminal, type <b>help</b> for details' ,
            prompt: '<span class="glyphicon glyphicon-heart-empty" style="color:gray"></span> ', separator: '&gt;'
}
        , { execute: function(cmd, args) {
            if (cmd.toLowerCase() in commands){
                return (commands[cmd.toLowerCase()](args));
            }
            else
                return false;
    }
});
terminal.setTheme("white");

/** Put terminal commands in this JSON **/
var commands = 
{
    'clear': function (args){terminal.clear();return ''},

    'theme': function (args){
        if (args && args[0]) {
            if (args.length > 1) return 'Too many arguments';
            else if (args[0].match(/^interlaced|modern|white$/)) { terminal.setTheme(args[0]); return ''; }
            else return 'Invalid theme';
        }
        return terminal.getTheme();
    },

    'help':function (args) {
        return (Object.keys(this)).toString();
    },


    'hello': function(args) {
        return 'Hello, Human!'
    },
    
    'blog': function(args) {
        return 'Hey, click <a href="http://v3c70r.github.io/blog"><b>here</b></a> to access my blog'
    },

    'about': function(args) {
        return 'I\'m a graduate student at Concordia University in Montreal, QC. My research intrests lie in Computer Graphics. I sometimes do skateboard in the summer and love to do snowboard in the long boring winter in Quebec. Hope you enjoy your stay.<br/>'+
            ' <a href="https://github.com/v3c70r" class="btn btn-social-icon btn-github"> <i class="fa fa-github"></i> </a> '+
            ' <a href="https://instagram.com/mcvector" class="btn btn-social-icon btn-instagram"> <i class="fa fa-instagram"></i> </a> '
    },

    'nyan': function(args) {
        if (args && args[0])
            if (args.length == 1) 
            {
                window.scrollTo(0,document.getElementById('terminal'));      //scroll to bottom of terminal
                if (args[0].toLowerCase() == 'fat')         return '<img width=200 src="images/nyanFat.gif"/>';
                if (args[0].toLowerCase() == 'mummy')       return '<img width=200 src="images/nyanMummy.gif"/>';
                if (args[0].toLowerCase() == 'original')    return '<img width=200 src="images/nyanOriginal.gif"/>';
                if (args[0].toLowerCase() == 'zombie')      return '<img width=200 src="images/nyanZombie.gif"/>';
            }

        paused = !paused;
        return "Usage: nayn [fat|mummy|original|zombie]";
    },
    'exit': function(args){
        close();   // Closes the new window
        return 'OOps..';
    },
    //====Play ground===
    'test': function(args) {
        return 'Nothing here';
    },
    
};


//===========THREE JS========

//Ugly global vars like old GLUT
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth/2;
var windowHalfY = window.innerHeight/2;
var scene, camera, renderer, material;
scene = new THREE.Scene();
var cube;
var light;
var updateFcts = [];

//Nyan Cat
var paused = true;

var nyanCatStars = new THREEx.NyanCatStars();
nyanCatStars.container.scale.multiplyScalar(9);
scene.add(nyanCatStars.container);
updateFcts.push( function(delta, now){
    if (paused) return;
    nyanCatStars.update(delta, now);});

var nyanCat = new THREEx.NyanCat();
nyanCat.container.scale.multiplyScalar(9);
scene.add(nyanCat.container);
updateFcts.push(function(delta, now){
    if( paused )    return
    nyanCat.update(delta, now)
})

var nyanCatRainbow = new THREEx.NyanCatRainbow();
nyanCatRainbow.container.scale.multiplyScalar(9);
scene.add(nyanCatRainbow.container);
updateFcts.push(function(delta, now){
    if( paused )    return
    nyanCatRainbow.update(delta, now)
})

init();
doAnimate();

function init(){
    //init scene
    //init camera
    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 2, 2000 );
    camera.position.z = 900;


    //Tell renderer where to render
    var container = document.getElementById('stage');
    //setting up renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor( 0xffffff ); 
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild(renderer.domElement);

    //add some materials
    material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
        side: THREE.DoubleSide, vertexColors: THREE.VertexColors
    });

    //var geometry = new THREE.BoxGeometry( 300, 300, 300 );
    //cube = new THREE.Mesh( geometry, material );
    //scene.add( cube );
    //var loader = new THREE.JSONLoader();
    //loader.load('images/flamingo.js', function (geometry, material){
    //    cube = new THREE.Mesh(geometry, material);
    //    cube.position.set(0,0,0);
    //});


    //setting up light
    light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set( 1, 1, 1);
    scene.add(light);

    window.addEventListener( 'resize', onWindowResize, false );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );

}

//mouse callback
function onDocumentMouseMove( event ) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

}
//Touching stuffs
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

var lastTimeMSec = null;
function doAnimate() {

    //requestAnimationFrame( animate );
    requestAnimationFrame( function animate(nowMsec){
        requestAnimationFrame(animate)
        lastTimeMSec = lastTimeMSec || nowMsec-1000/60;
        var deltaMsec = Math.min(200, nowMsec - lastTimeMSec);
        lastTimeMSec = nowMsec;
        		// call each update function
		updateFcts.forEach(function(updateFn){
			updateFn(deltaMsec/1000, nowMsec/1000)
		})
        render();
    });
}

function render() {
    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
    camera.lookAt( scene.position );
    renderer.render(scene, camera);

}
//resize callback
function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}
