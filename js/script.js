var game;

function init()
{
    var w = window.innerWidth;
    var h = window.innerHeight;

    game = new Phaser.Game(w, h, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    addStats();
}

function preload() {
}

function create()
{

    // adding P2 physics to the game
    game.physics.startSystem(Phaser.Physics.P2JS);
    // setting gravity
    game.physics.p2.gravity.y = 250;
    // adding event listener for mousedown/touch event
    game.input.onDown.add(addRemove, this);
}

function addStats()
{
    // STATS
	stats = new Stats();
	stats.domElement.style.position = "absolute";
	document.body.appendChild( stats.domElement );
}

function addRemove(pointer){
    // checking for bodies under the mouse
    var bodyClicked = game.physics.p2.hitTest(pointer.position);
    if(bodyClicked.length==0){
        // creation of physics body and its graphic asset
        var crate = game.add.sprite(pointer.position.x, pointer.position.y, "crate");
        game.physics.p2.enable(crate);
    }
    else{
        // destruction of physics body and its graphic asset
        bodyClicked[0].parent.sprite.kill();
    }
}


function update() {
    stats.update();
}
