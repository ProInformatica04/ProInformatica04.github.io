var score = 0;
var scoreText;
var numPlatforms = 5;


class ScenaProva extends Phaser.Scene {
    constructor() {
		super({ key: 'ScenaProva' })
    }
    

restartGame(player, bombs) {
    this.cameras.main.fade(500);
    this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
        this.scene.restart();
    }, this);
   
}

init(data){ 
    this.data.set('level', data.level);
    this.data.set('lives', data.lives);
    this.data.set('score', data.score);
    this.data.set('playername', data.playername );
}

preload ()
{
    
    //this.load.setBaseURL('http://labs.phaser.io');
    this.load.image('sky', './assets/space3.png');
    this.load.image('plain', './assets/strip2.png');
    this.load.image('ground', './assets/50x50.png');
    this.load.image('star', './assets/mushroom.png');
    this.load.image('bomb', './assets/asteroid1.png');
    this.load.image('bg3', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Codey+Tundra/snowdunes.png');
    this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 })
}
create ()
{
        this.physics.world.setBounds(0, 0, GameState.inGameWidth, GameState.inGameHeight);
        
        GameState.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky');
        GameState.background2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg3');
        GameState.background.setOrigin(0, 0);
        GameState.background.setScrollFactor(0);
        GameState.background2.setOrigin(0, 0);
        GameState.background2.setScrollFactor(0);
        
        GameState.platforms = this.physics.add.staticGroup();
        let blocco = this.add.tileSprite(400, 500, 4*50, 50, 'ground');
        let blocco2 = this.add.tileSprite(660, 300, 3*50, 50, 'ground');
        let blocco3 = this.add.tileSprite(50, 220, 2*50, 50, 'ground');
        let blocco4 = this.add.tileSprite(400, 120, 2*50, 50, 'ground');
        let blocco5 = this.add.tileSprite(276, 317, 2*50, 50, 'ground');
        let blocco6 = this.add.tileSprite(1076, 317, 6*50, 50, 'ground');
        GameState.platforms.add(blocco);
        GameState.platforms.add(blocco2);
        GameState.platforms.add(blocco3);
        GameState.platforms.add(blocco4);
        GameState.platforms.add(blocco5);
        GameState.platforms.add(blocco6);

            // Dati di gioco : punteggio

            if (isNaN(this.data.get('score')) ) {
                this.data.set('score', 0);
            }
            if (isNaN(this.data.get('lives')) ) {
                this.data.set('lives', 0);
            }
            if (isNaN(this.data.get('level')) ) {
                this.data.set('level', 0);
            }
            /*
            if (isNaN(this.data.get('playername')) ) {
                this.data.set('playername', 'Anonimo');
            }
            */
            // Inserisco dati di gioco
            GameState.text = this.add.text(20, 20, '', { font: '20px Courier', fill: '#00ff00' });

            GameState.text.setText([
                'Player: ' + this.data.get('playername'),
                'Level: ' + this.data.get('level'),
                'Lives: ' + this.data.get('lives'),
                'Score: ' + this.data.get('score')
            ]);




        GameState.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        GameState.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        GameState.bombs = this.physics.add.group({
            key: 'bomb',
            repeat: 5,
            setXY: {x: 40, y: 40, stepX: 150}
        });
        GameState.player = this.physics.add.sprite(0, 600, 'dude');
        GameState.player.setCollideWorldBounds(true);
        this.physics.add.collider(GameState.player, GameState.platforms);
        this.physics.add.collider(GameState.stars, GameState.platforms);
        this.physics.add.overlap(GameState.player, GameState.stars, this.collectStar, null, this);
        this.physics.add.overlap(GameState.player, GameState.bombs, this.restartGame, null, this);
        this.physics.add.collider(GameState.bombs, GameState.platforms);
        this.physics.add.collider(GameState.player, GameState.bombs, this.hitBomb, null, this);
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
        
        GameState.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBounds(0, 0, this.width, 0);
        this.cameras.main.startFollow(GameState.player, true, 0.09, 0.09);
}
update ()
{
    GameState.background.tilePositionX = this.cameras.main.scrollX * .9;
    GameState.background2.tilePositionX = this.cameras.main.scrollX * .5;
    if(GameState.cursors.left.isDown) {
        GameState.player.setVelocityX(-160);
        GameState.player.anims.play('left', true);
    }
    else if (GameState.cursors.right.isDown) {
        GameState.player.setVelocityX(160);
        GameState.player.anims.play('right', true);
    }
    else {
        GameState.player.setVelocityX(0);
        GameState.player.anims.play('turn');
    }
    if (GameState.cursors.up.isDown && (GameState.player.body.touching.down || GameState.player.body.blocked.down)) {
        GameState.player.setVelocityY(-580);
    }
}
collectStar (player, star)
{
    star.disableBody(true, true);
    /* aggiorno il punteggio tutte le volte che mangio un funghetto*/

    this.data.set('score', score+= 10);
    GameState.text.setText([
        'Player: ' + this.data.get('playername'),
        'Level: ' + this.data.get('level'),
        'Lives: ' + this.data.get('lives'),
        'Score: ' + this.data.get('score')
    ]); 
     /* fine aggiorno il punteggio tutte le volte che mangio un funghetto*/

    if (GameState.stars.countActive(true) === 0)
    {
        GameState.stars.children.iterate(function (child) {

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

    GameState.gameOver = true;
    

}

}