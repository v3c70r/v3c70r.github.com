// jshint devel:true

//===============Setting up Nehan====
var doc = new Nehan.Document();
var chushibiao=
  "臣亮言：先帝創業未半，而中道崩殂，今天下三分，益州疲敝，此誠危急存亡之秋也。然侍衞之臣不懈於內，忠志之士忘身於外者，蓋追先帝之殊遇，欲報之於陛下也。誠宜開張聖聽，以光先帝遺德，恢弘志士之氣，不宜妄自菲薄，引喻失義，以塞忠諫之路也。"+
　"宮中府中俱爲一體，陟罰臧否，不宜異同。若有作姦犯科及爲忠善者，宜付有司，論其刑賞，以昭陛下平明之治，不宜偏私，使內外異法也。"+
　"侍中、侍郎郭攸之、費禕、董允等，此皆良實，志慮忠純，是以先帝簡拔以遺陛下。愚以爲宮中之事，事無大小，悉以咨之，然後施行，必能裨補闕漏，有所廣益。"+
　"將軍向寵，性行淑均，曉暢軍事，試用之於昔日，先帝稱之曰能，是以衆議舉寵爲督。愚以爲營中之事，事無大小，悉以咨之，必能使行陣和睦，優劣得所也。"+
　"親賢臣，遠小人，此先漢所以興隆也；親小人，遠賢臣，此後漢所以傾頹也。先帝在時，每與臣論此事，未嘗不歎息痛恨於桓、靈也。侍中、尚書、長史、參軍，此悉貞良死節之臣也，願陛下親之信之，則漢室之隆，可計日而待也。"+
　"臣本布衣，躬耕南陽，苟全性命於亂世，不求聞達於諸侯。先帝不以臣卑鄙，猥自枉屈，三顧臣於草廬之中，諮臣以當世之事，由是感激，遂許先帝以驅馳。後值傾覆，受任於敗軍之際，奉命於危難之間，爾來二十有一年矣。"+
　"先帝知臣謹慎，故臨崩寄臣以大事也。受命以來，夙夜憂慮，恐託付不效，以傷先帝之明，故五月渡瀘，深入不毛。今南方已定，兵甲已足，當獎率三軍，北定中原，庶竭駑鈍，攘除姦凶，興復漢室，還于舊都。此臣所以報先帝，而忠陛下之職分也。至於斟酌損益，進盡忠言，則攸之、禕、允之任也。"+
　"願陛下託臣以討賊興復之效；不效，則治臣之罪，以告先帝之靈。若無興德之言，則責攸之、禕、允等之慢，以彰其咎。陛下亦宜自謀，以諮諏善道，察納雅言。深追先帝遺詔，臣不勝受恩感激。"+
　"今當遠離，臨表涕泣，不知所云。";
doc.setContent(chushibiao);
var renderStr='';
doc.setStyle("body", {
  flow:"tb-rl",
  //flow:"tb-rl", // Japanese vertical style
  fontSize:"16px",
  width:"990px",
  height:"580px"
});
doc.render({
  onPage:function(page, ctx){
    console.log("onPage:%o", page);
    page.element.style.marginBottom = "1em";
    renderStr=page.element.innerHTML;
  },
  onComplete:function(time, ctx){
    console.log("finish! %f msec", time);
  }
});

//======TERMINAL=======
var terminal = new Terminal('terminal', {
            welcome: 'Hey, Welcome to my web terminal, type <b>help</b> for details' ,
            prompt: '<span class="glyphicon glyphicon-heart-empty" style="color:gray"></span> ', separator: '&gt;'
},
         { execute: function(cmd, args) {
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
    'about': function(args) {
        return 'I\'m a graduate student at Concordia University in Montreal, QC. My research intrests lie in Computer Graphics. I sometimes do skateboard in the summer and love to do snowboard in the long boring winter in Quebec. Hope you enjoy your stay.<br/>'+
            ' <a href="https://github.com/v3c70r" class="btn btn-social-icon btn-github"> <i class="fa fa-github"></i> </a> '+
            ' <a href="https://instagram.com/mcvector" class="btn btn-social-icon btn-instagram"> <i class="fa fa-instagram"></i> </a> ';
    },
    'blog': function(args) {
        return 'Hey, click <a href="http://v3c70r.github.io/blog"><b>here</b></a> to access my blog';
    },
    'clear': function (args){terminal.clear();return '';},

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
        return 'Hello, Human!';
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
        return "Usage: nyan [fat|mummy|original|zombie]";
    },
    'exit': function(args){
        return 'OOps..';
    },
    //====Play ground===
    'test': function(args) {
        return renderStr;
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
    if( paused )    return;
    nyanCat.update(delta, now);
});

var nyanCatRainbow = new THREEx.NyanCatRainbow();
nyanCatRainbow.container.scale.multiplyScalar(9);
scene.add(nyanCatRainbow.container);
updateFcts.push(function(delta, now){
    if( paused )    return;
    nyanCatRainbow.update(delta, now);
});

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
        requestAnimationFrame(animate);
        lastTimeMSec = lastTimeMSec || nowMsec-1000/60;
        var deltaMsec = Math.min(200, nowMsec - lastTimeMSec);
        lastTimeMSec = nowMsec;
        		// call each update function
		updateFcts.forEach(function(updateFn){
			updateFn(deltaMsec/1000, nowMsec/1000);
		});
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
