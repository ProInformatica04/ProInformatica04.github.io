var score = 0;
var scoreText;
var numPlatforms = 5;


class GiocoParadiso extends Phaser.Scene {
    constructor() {
		super({ key: 'GiocoParadiso' })
    }
    

restartGame(player, bombs) {
    this.cameras.main.fade(500);
    this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
        this.scene.restart();
    }, this);
    score = 50;
   
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
    this.load.image('paradise', './assets/purgatorio_sfondo.jpg');
    this.load.image('plain', './assets/strip2.png');
    this.load.image('ground', './assets/50x50.png');
    this.load.image('star', './assets/mushroom.png');
    this.load.spritesheet('stelle', './assets/stelle_transp.png', { frameWidth: 97, frameHeight: 109 });
    this.load.image('bg3_Par', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Codey+Tundra/snowdunes.png');
    this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 })
    this.load.spritesheet('angel', './assets/angels.png', { frameWidth: 48, frameHeight: 64 })
}
create ()
{
        this.physics.world.setBounds(0, 0, GameState.inGameWidth, GameState.inGameHeight);
        
        GameState.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'paradise');
        GameState.background2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg3_Par');
        GameState.background.setOrigin(0, 0);
        GameState.background.setScrollFactor(0);
        GameState.background2.setOrigin(0, 0);
        GameState.background2.setScrollFactor(0);
        var Bottone1 = this.add.sprite(700, 30, 'button').setInteractive().setScale(1.95, 1.95).setScrollFactor(0, 0);
        GameState.platforms = this.physics.add.staticGroup();
        let blocco = this.add.tileSprite(400, 500, 1*50, 50, 'ground');
        let blocco2 = this.add.tileSprite(650, 300, 3*50, 50, 'ground');
        let blocco3 = this.add.tileSprite(50, 220, 2*50, 50, 'ground');
        let blocco4 = this.add.tileSprite(400, 120, 1*50, 50, 'ground');
        let blocco5 = this.add.tileSprite(276, 317, 2*50, 50, 'ground');
        let blocco6 = this.add.tileSprite(1076, 347, 3*50, 50, 'ground');
        let blocco7 = this.add.tileSprite(875, 170, 1*50, 50, 'ground');
        let blocco8 = this.add.tileSprite(1220, 180, 3*50, 50, 'ground');
        let blocco9 = this.add.tileSprite(1350, 470, 1*50, 50, 'ground');
        let blocco10 = this.add.tileSprite(1460, 265, 2*50, 50, 'ground');
        let blocco11 = this.add.tileSprite(1676, 237, 3*50, 50, 'ground');
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
            GameState.text = this.add.text(20, 20, '', { font: '15px Courier Bold', fill: '#FFFFFF' });

            GameState.text.setText([
                'Player: ' + this.data.get('playername'),
                'Level: ' + this.data.get('level'),
                //'Lives: ' + this.data.get('lives'),
                'Score: ' + this.data.get('score'),
                'Score to next level: ' + (GameState.ScoreLivello1Paradiso - this.data.get('score'))
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
            key: 'stelle',
            repeat: 18,
            setXY: {x: 40, y: 40, stepX: 100}
        });
        GameState.player = this.physics.add.sprite(0, 600, 'dude');
        GameState.player.setGravityY(800);
        GameState.angel = this.physics.add.sprite(390, 62, 'angel');
        GameState.angel2 = this.physics.add.sprite(885, 112, 'angel');
        GameState.angel3 = this.physics.add.sprite(1185, 122, 'angel');
        GameState.angel4 = this.physics.add.sprite(1691, 179, 'angel');
        GameState.angels_par = this.physics.add.group()
        GameState.player.setCollideWorldBounds(true);
        GameState.angels_par.add(GameState.angel)
        GameState.angels_par.add(GameState.angel2)
        GameState.angels_par.add(GameState.angel3)
        GameState.angels_par.add(GameState.angel4)
        this.physics.add.collider(GameState.player, GameState.platforms);
        //this.physics.add.collider(GameState.stars, GameState.platforms);
        this.physics.add.overlap(GameState.player, GameState.angels_par, this.collectStar, null, this);
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
            key: 'stelle_anim',
            frames: this.anims.generateFrameNumbers('stelle'),
            frameRate: 15,
            repeat: -1,
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
            key: 'turn_angel',
            frames: [ { key: 'angel', frame: 7 } ],
            frameRate: 20
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
        GameState.bombs.children.iterate(function (child) {
            child.setScale(.5, .5);
            child.setCollideWorldBounds(true)
            child.play('stelle_anim');
            child.setGravityY(100);
            child.setBounceY(1);
        });
        GameState.angels_par.children.iterate(function (child) {
            child.setCollideWorldBounds(true)
            child.play('turn_angel');
        });
        Bottone1.on('pointerdown', function (pointer) {
            this.cameras.main.fade(500);
            this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
                    GameState.MusicaParadiso.Stop();
                    this.scene.stop('GiocoParadiso');
                    this.scene.start('ProvePerGioco',{ level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score'), playername : this.data.get('playername') });   
                }, this); 



            }, this);
}
update ()
{
    GameState.background.tilePositionX = this.cameras.main.scrollX * .9;
    GameState.background2.tilePositionX = this.cameras.main.scrollX * .5;
    GameState.angel.anims.play('turn_angel')
    GameState.angel2.anims.play('turn_angel')
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
        'Score to next level: ' + (GameState.ScoreLivello1Paradiso - this.data.get('score'))
    ]); 

    if(this.data.get('score') === GameState.ScoreLivello1Paradiso) {
        //this.add.text(400, 300, `Hai Finito!!!! Beccati la visione beatifica`, { font: '25px Cooper Black', color: '#8C3ACD', align: 'center'}).setOrigin(0,0);
        GameState.MusicaParadiso.stop();
        this.scene.stop('ScenaGiocoParadiso');
        this.scene.start('ScenaRiepilogo', { level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score'), playername : this.data.get('playername') });
        this.data.set(20, 'score')  
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