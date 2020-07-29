class ScenaProva extends Phaser.Scene {
    constructor() {
		super({ key: 'ScenaProva' })
    }
    
var score = 0;
var scoreText;
var numPlatforms = 5;
restartGame(player, bombs) {
    this.cameras.main.fade(500);
    this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
        this.scene.restart();
    }, this);
    score = 0;
   
}
preload ()
{
    
    //this.load.setBaseURL('http://labs.phaser.io');
    this.load.image('sky', './assets/space3.png');
    this.load.image('ground', './assets/50x50.png');
    this.load.image('star', './assets/mushroom.png');
    this.load.image('bomb', './assets/asteroid1.png');
    this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 });

    
}
create ()
{
        this.physics.world.setBounds(0, 0, GameState.inGameWidth, GameState.inGameHeight);
        this.background = this.add.tileSprite(0, 0, 1600, 1200, 'sky');
        platforms = this.physics.add.staticGroup();
        bombs = this.physics.add.group();
        let blocco = this.add.tileSprite(400, 500, 4*50, 50, 'ground');
        let blocco2 = this.add.tileSprite(660, 300, 3*50, 50, 'ground');
        let blocco3 = this.add.tileSprite(50, 220, 2*50, 50, 'ground');
        let blocco4 = this.add.tileSprite(400, 120, 2*50, 50, 'ground');
        let blocco5 = this.add.tileSprite(276, 317, 2*50, 50, 'ground');
        platforms.add(blocco);
        platforms.add(blocco2);
        platforms.add(blocco3);
        platforms.add(blocco4);
        platforms.add(blocco5);

        scoreText = this.add.text(16, 16, 'Punteggio: 0', { fontSize: '32px', fill: 'white' });
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        bombs = this.physics.add.group({
            key: 'bomb',
            repeat: 5,
            setXY: {x: 40, y: 40, stepX: 150}
        });
        player = this.physics.add.sprite(0, 600, 'dude');
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this);
        this.physics.add.overlap(player, bombs, restartGame, null, this);
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(player, bombs, hitBomb, null, this);
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        
        cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBounds(0, 0, this.width, 0);
        this.cameras.main.startFollow(player, true, 0.09, 0.09);
}
update ()
{
    if(cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
    }
    else {
    player.setVelocityX(0);
    player.anims.play('turn');
    }
    if (cursors.up.isDown && (player.body.touching.down || player.body.blocked.down)) {
    player.setVelocityY(-530);
    }
}
collectStar (player, star)
{
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Punteggio: ' + score);
    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
    
}
hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
    

}

}