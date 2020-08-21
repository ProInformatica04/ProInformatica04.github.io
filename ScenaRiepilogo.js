class ScenaRiepilogo extends Phaser.Scene {
    constructor() {
		super({ key: 'ScenaRiepilogo' })
    }

    init(data){ 
        this.data.set('level', data.level);
        this.data.set('lives', data.lives);
        this.data.set('score', data.score);
        this.data.set('playername', data.playername );
    }
    
    preload() {
        this.load.spritesheet('button', './assets/flixel-button.png', { frameWidth: 80, frameHeight: 20 });
        this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('sfondoprova', './assets/purgatorio_sfondo.jpg');
        
        this.load.spritesheet('exit', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Cave+Crisis/cave_exit.png', { frameWidth: 60, frameHeight: 70 });
    }
    create (){
        this.physics.world.setBounds(0, 0, 800, 600);
        GameState.background_riepulogue = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sfondoprova');
        // Inserisco dati di gioco
        GameState.playerriepilogue = this.physics.add.sprite(0, 600, 'dude')
        
        
        GameState.playerriepilogue.setCollideWorldBounds(true);
        var text = this.add.text(70, 130, '', { font: '20px Courier Bold', fill: '#FFFFFF'});
        GameState.background_riepulogue.setOrigin(0, 0)
        text.setText([
            'Player: ' + this.data.get('playername'),
            //'Level: ' + this.data.get('level'),
            //'Lives: ' + this.data.get('lives'),
            'Score: ' + this.data.get('score')
        ]);

        var NextLevel='Inferno'
        switch (this.data.get('level') ) {
            case 'Inferno' :
                NextLevel='Pugatorio';
                var text = this.add.text(100, 250, 'Congratulazioni! Attraversa la porta per finire in '+NextLevel, { color: '#B8860B', fontFamily: 'Bold Courier', fontSize: '25px ', align: 'center'});
                
            break;
            case 'Purgatorio' :
                NextLevel='Paradiso';
                var text = this.add.text(100, 250, 'Congratulazioni! Attraversa la porta per finire in '+NextLevel, { color: '#B8860B', fontFamily: 'Bold Courier', fontSize: '25px ', align: 'center'});
                
            break;
            case 'Paradiso' :
                    NextLevel='Fine';    
                    var text = this.add.text(100, 250, 'Hai finitoooooooo!!!! Beccati la Visione Beatifica '+NextLevel, { color: '#B8860B', fontFamily: 'Bold Courier', fontSize: '25px ', align: 'center'});
                    GameState.timer_riepilogue = this.time.delayedCall(2000, function() {
                        this.cameras.main.fade(500);
                        this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
                                this.scene.stop('ScenaRiepilogo');   
                                this.scene.start('ScenaFinale',{ level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score'), playername : this.data.get('playername') });   
                            }, this);
                    }, [], this)
            break;
            default :
                NextLevel='Inferno';   
                var text = this.add.text(100, 300, 'Congratulazioni! Attraversa la porta per finire in '+NextLevel, { color: '#B8860B', fontFamily: 'Bold Courier', fontSize: '25px ', align: 'center'}); 
            break;
        }  
        GameState.exit = this.physics.add.sprite(400, 600, 'exit').setScale(1.5, 1.5);
        GameState.exit.setCollideWorldBounds(true)
    this.anims.create({
      key: 'glow',
      frames: this.anims.generateFrameNumbers('exit', { start: 0, end: 5 }),
      frameRate: 4,
      repeat: -1
    });
    this.physics.add.overlap(GameState.playerriepilogue, GameState.exit, this.end, null, this)
        GameState.exit.anims.play('glow', true);
        // Dati di gioco
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
    }
    update () {
        GameState.exit.anims.play('glow', true);
        if(GameState.cursors.left.isDown) {
            GameState.playerriepilogue.setVelocityX(-160);
            GameState.playerriepilogue.anims.play('left', true);
        }
        else if (GameState.cursors.right.isDown) {
            GameState.playerriepilogue.setVelocityX(160);
            GameState.playerriepilogue.anims.play('right', true);
        }
        else {
            GameState.playerriepilogue.setVelocityX(0);
            GameState.playerriepilogue.anims.play('turn');
        }
        if (GameState.cursors.up.isDown && (GameState.playerriepilogue.body.touching.down || GameState.playerriepilogue.body.blocked.down)) {
            GameState.playerriepilogue.setVelocityY(-580);
        }
    }
    end () {
        this.cameras.main.fade(200);
            this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
                    this.scene.stop('ScenaRiepilogo');
                    this.scene.start('ProvePerGioco', { level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score'), playername : this.data.get('playername') });   
                }, this);
    }
}