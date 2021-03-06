var score = 0;
var scoreText;
var numPlatforms = 5;

var randomNum = Math.random()
class GiocoInferno extends Phaser.Scene {
    constructor() {
		super({ key: 'GiocoInferno' })
    }
    

restartGame(player, bombs) {
    this.cameras.main.fade(500);
    this.data.set('score',  GameState.ScoreLivello1Inferno);
    score=0;
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
    this.load.html('modalform', './assets/text/modalform.html');
    this.load.image('hell', './assets/inferno8.jpg');
    this.load.image('ground', './assets/50x50.png');
    this.load.image('bg3', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Codey+Tundra/snowdunes.png');
    this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 })
    this.load.spritesheet('fire', './assets/fiammerosse.png', { frameWidth: 58, frameHeight: 106})
    this.load.spritesheet('devil', './assets/devil2.png', { frameWidth: 48, frameHeight: 64 })
}
create ()
{
        this.physics.world.setBounds(0, 0, GameState.inGameWidth, GameState.inGameHeight);
        
        GameState.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'hell');
        GameState.background2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg3');
        GameState.background.setOrigin(0, 0);
        GameState.background.setScrollFactor(0);
        GameState.background2.setOrigin(0, 0);
        GameState.background2.setScrollFactor(0);
        var Bottone1 = this.add.sprite(700, 30, 'button').setInteractive().setScale(1.95, 1.95).setScrollFactor(0,0);
        GameState.platforms = this.physics.add.staticGroup();
        let blocco = this.add.tileSprite(400, 500, 4*50, 50, 'ground');
        let blocco2 = this.add.tileSprite(660, 300, 3*50, 50, 'ground');
        let blocco3 = this.add.tileSprite(50, 220, 2*50, 50, 'ground');
        let blocco4 = this.add.tileSprite(400, 120, 2*50, 50, 'ground');
        let blocco5 = this.add.tileSprite(276, 317, 2*50, 50, 'ground');
        let blocco6 = this.add.tileSprite(930, 337, 2*50, 50, 'ground');
        let blocco7 = this.add.tileSprite(1195, 250, 4*50, 50, 'ground');
        let blocco8 = this.add.tileSprite(1220, 100, 3*50, 50, 'ground');
        let blocco9 = this.add.tileSprite(1350, 470, 5*50, 50, 'ground');
        let blocco10 = this.add.tileSprite(1460, 265, 1*50, 50, 'ground');
        let blocco11 = this.add.tileSprite(1676, 317, 4*50, 50, 'ground');
        GameState.platforms.add(blocco);
        GameState.platforms.add(blocco2);
        GameState.platforms.add(blocco3);
        GameState.platforms.add(blocco4);
        GameState.platforms.add(blocco5);
        GameState.platforms.add(blocco6);
        GameState.platforms.add(blocco7);
        GameState.platforms.add(blocco8);
        GameState.platforms.add(blocco9);
        GameState.platforms.add(blocco10);
        GameState.platforms.add(blocco11);
        GameState.MainMenu = this.add.text(665, 23, `Main Menu`, { font: '12px Cooper Black', color: '#8C3ACD', align: 'center'}).setOrigin(0,0);
        GameState.MainMenu.setScrollFactor(0, 0)
            // Dati di gioco : punteggio

            if (isNaN(this.data.get('score')) ) {
                this.data.set('score', 0);
            }
         
            // Inserisco dati di gioco
            GameState.text = this.add.text(GameState.Xtext, GameState.Ytext, '', { font: '15px Courier Bold', fill: '#00ff00' });

            GameState.text.setText([
                'Player: ' + this.data.get('playername'),
                'Level: ' + this.data.get('level'),
                //'Lives: ' + this.data.get('lives'),
                'Score: ' + this.data.get('score'),
                'Score to next level: ' + (GameState.ScoreLivello1Inferno - this.data.get('score'))
            ]);
            GameState.text.setScrollFactor(0, 0);
        /*GameState.stars = this.physics.add.group({
            key: 'angel',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
            frame: 7
        });
        GameState.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });*/
        GameState.bombs = this.physics.add.group({
            key: 'fire',
            repeat: 12,
            setXY: {x: 140, y: 40, stepX: 130}
        });
        GameState.player = this.physics.add.sprite(0, 600, 'dude');
        GameState.player.setGravityY(800)
        GameState.angel = this.physics.add.sprite(615, 242, 'devil');
        GameState.angel2 = this.physics.add.sprite(1636, 259, 'devil');
        /*for(let i = 0; i< 5; i++) {
            GameState.fire = this.physics.add.sprite(0, 300, 'fire').setScale(.3, .3);
        }*/
        
        GameState.player.setCollideWorldBounds(true);
        GameState.angel.setCollideWorldBounds(true);
        GameState.angel2.setCollideWorldBounds(true);
        
        this.physics.add.collider(GameState.player, GameState.platforms);
        //this.physics.add.collider(GameState.stars, GameState.platforms);
        this.physics.add.overlap(GameState.player, GameState.angel, this.collectStar, null, this);
        this.physics.add.overlap(GameState.player, GameState.angel2, this.collectStar, null, this);
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
        this.anims.create({
            key: 'fire_anim',
            frames: this.anims.generateFrameNumbers('fire'),
            frameRate: 5,
            repeat: -1,
        });
        this.anims.create({
            key: 'turn_devil',
            frames: [ { key: 'devil', frame: 7 } ],
            frameRate: 20
        });
        
        GameState.bombs.children.iterate(function (child) {
            child.setScale(.5, .5);
            child.setCollideWorldBounds(true)
            child.play('fire_anim');
            child.setGravityY(100);
            child.setBounceY(1);
        });
        GameState.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBounds(0, 0, this.inGameWidth, 0);
        this.cameras.main.startFollow(GameState.player, true, 0.09, 0.09);
        this.input.on('gameobjectover', function (pointer, button)
        {
            setButtonFrame(button, 0);
        });
        this.input.on('gameobjectout', function (pointer, button)
        {
            setButtonFrame(button, 1);
            
        });
        this.input.on('gameobjectdown', function (pointer, button)
        {
            setButtonFrame(button, 2);
        }, this);
        this.input.on('gameobjectup', function (pointer, button)
        {
            setButtonFrame(button, 0);
        });
        Bottone1.on('pointerdown', function (pointer) {
            this.cameras.main.fade(500);
            this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
                    GameState.MusicaInferno.stop();
                    score = 0;
                    this.data.set('score', 0)
                    this.scene.stop('GiocoInferno');
                    this.scene.start('ProvePerGioco',{ level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score'), playername : this.data.get('playername') });   
                }, this); 



            }, this);
}
update ()
{
    GameState.background.tilePositionX = this.cameras.main.scrollX * .9;
    GameState.background2.tilePositionX = this.cameras.main.scrollX * .5;
    GameState.angel.anims.play('turn_devil')
    
    GameState.angel2.anims.play('turn_devil')
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
        //'Lives: ' + this.data.get('lives'),
        'Score: ' + this.data.get('score'),
        'Score to next level: ' + (GameState.ScoreLivello1Inferno - this.data.get('score'))
    ]); 

    if(this.data.get('score') === GameState.ScoreLivello1Inferno) {
        this.add.text(400, 300, `Hai Finito!!!!`, { font: '25px Cooper Black', color: '#8C3ACD', align: 'center'}).setOrigin(0,0);
        this.scene.stop('GiocoInferno');
        GameState.MusicaInferno.stop();
        this.scene.start('ScenaRiepilogo', { level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score'), playername : this.data.get('playername') }); 
    }

     /* fine aggiorno il punteggio tutte le volte che mangio un funghetto*/

    /*if (GameState.stars.countActive(true) === 0)
    {
        GameState.stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
*/
    }
    

hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    GameState.gameOver = true;
    

}

}