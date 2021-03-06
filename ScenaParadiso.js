function setButtonFrame(button, frame)
{
    button.frame = button.scene.textures.getFrame('button', frame);
} 


class ScenaParadiso extends Phaser.Scene {
    constructor() {
		super({ key: 'ScenaParadiso' })
    }
   
init(data){ 
        this.data.set('level', data.level);
        this.data.set('lives', data.lives);
        this.data.set('score', data.score);
        this.data.set('playername', data.playername );
    }
 
preload() {
        this.load.spritesheet('button', './assets/flixel-button.png', { frameWidth: 80, frameHeight: 20 });
        this.load.image('paradiso', './assets/Paradiso.jpg');
        this.load.audio('musicaParadiso', './assets/MusicaParadiso.mp3');
    }
create() {
        /*const BottoniNomi = [
        { name: 'Livello 1', },
        { name: 'Livello 2'},
        { name: 'Livello 3'},
        ]*/
        var back_p = this.add.image(400, 300, 'paradiso');
        back_p.setScale(800/back_p.width, 600/back_p.height);
        GameState.MusicaParadiso = this.sound.add('musicaParadiso');
        GameState.MusicaParadiso.setLoop(true);
        GameState.MusicaParadiso.play();
        
        //titolo
        var Titolo= this.add.text(150, 250, `${GameState.title} Paradiso \n ` , { align: 'center', font: '48px Bold Courier', fill: '#010005', shadow: '#ccc 0 1px 0, #c9c9c9 0 2px 0, #bbb 0 3px 0, #b9b9b9 0 4px 0, #aaa 0 5px 0,rgba(0,0,0,.1) 0 6px 1px, rgba(0,0,0,.1) 0 0 5px, rgba(0,0,0,.3) 0 1px 3px, rgba(0,0,0,.15) 0 3px 5px, rgba(0,0,0,.2) 0 5px 10px, rgba(0,0,0,.2) 0 10px 10px, rgba(0,0,0,.1) 0 20px 20px'});
        Titolo.stroke = "#000000";
        Titolo.strokeThickness = 10;
        Titolo.fill = '#43d637'
        Titolo.setShadow(1, 1, "#000000", 1, true, true);
        
        // Scritta in mezzo
        var TestoInMezzo = this.add.text(60, 320,  'Utilizza le quattro freccette nella parte bassa della tastiera per muoverti, \n Rimarrai in Paradiso fino a raggiungere il punteggio: '+GameState.ScoreLivello1Paradiso, {font: '24px Bold', fill: '#000000'})
        // this.add.text(140, 290,  'Rimarrai in Inferno fino a raggiungere il punteggio: '+GameState.ScoreLivello1Inferno, {font: '24px Bold', fill: '#FFFFFF'})
        TestoInMezzo.stroke = "#778fde";
        TestoInMezzo.strokeThickness = 10;
        //  Apply the shadow to the Stroke and the Fill (this is the default)
        TestoInMezzo.setShadow(1, 1, "#000000", 1, true, true);
        TestoInMezzo.setBackgroundColor("#FF0000");


        //this.add.text(140, 360,  'Rimarrai in Paradiso fino a raggiungere il punteggio: '+GameState.ScoreLivello1Paradiso, {font: '24px Bold', fill: '#000000'})
        
        // Dati di gioco : punteggio e livello
        
        if (isNaN(this.data.get('score')) ) {
            this.data.set('score', 0);
        }
        
        // Inserisco dati di gioco
        var text = this.add.text(70, 100, '', { font: '20px Courier Bold', fill: '##000000'});

        text.setText([
            'Player: ' + this.data.get('playername'),
            'Level: ' + this.data.get('level'),
            //'Lives: ' + this.data.get('lives'),
            'Score: ' + this.data.get('score')
        ]);

        text.stroke = "#000000";
        text.strokeThickness = 5;
        text.setShadow(0.5, 0.5, "#000000", 0.5, true, true);

        GameState.timer = this.time.delayedCall(3000, function() {
            this.cameras.main.fade(500);
            this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
                    this.scene.stop('ScenaParadiso');
                    this.scene.start('GiocoParadiso',{ level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score'), playername : this.data.get('playername') });   
                }, this);
        }, [], this)
        // Definizione Bottoni
        /*var Bottone1 = this.add.sprite(400, GameState.separator*1, 'button').setInteractive().setScale(3, 3);
        var Bottone2 = this.add.sprite(400, GameState.separator*2, 'button').setInteractive().setScale(3, 3);
        var Bottone3 = this.add.sprite(400, GameState.separator*3, 'button').setInteractive().setScale(3, 3);
        for(let i = 1; i<=3; i++) {
            this.add.text(300, (GameState.separator*i)-10, `${BottoniNomi[i-1].name}`, { font: '18px Cooper Black', color: '#8C3ACD', align: 'center'}).setOrigin(0,0);
        }
        this.input.on('gameobjectover', function (pointer, button)
        {
            setButtonFrame(button, 0);
        });
        this.input.on('gameobjectout', function (pointer, button)
        {
            setButtonFrame(button, 1);
            
        });*/
     

        /*
        //codice per stabilire cosa succede quando clicca il primo bottone
        Bottone1.on('pointerdown', function (pointer) {
            this.cameras.main.fade(5500);
            this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
                    this.scene.stop('ProvePerGioco');
                    this.scene.start('ScenaGiocoParadiso',{ level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score'), playername : this.data.get('playername') });   
                }, this);
        }, this);
        //codice per stabilire cosa succede quando clicca il secondo bottone
        Bottone2.on('pointerdown', function (pointer) {
            this.cameras.main.fade(500);
            this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
                    this.scene.stop('ProvePerGioco');
                    this.scene.start('ScenaPurgatorio',{ level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score'), playername : this.data.get('playername') });   
                }, this);
        }, this);
        //codice per stabilire cosa succede quando clicca il terzo bottone
        Bottone3.on('pointerdown', function (pointer) {
            this.cameras.main.fade(500);
            this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
                    this.scene.stop('ProvePerGioco');
                    this.scene.start('ScenaInferno',{ level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score'), playername : this.data.get('playername') });   
                }, this);
        }, this);
        this.input.on('gameobjectdown', function (pointer, button)
        {
            setButtonFrame(button, 2);
            MusicaParadiso.stop();
        }, this);
        this.input.on('gameobjectup', function (pointer, button)
        {
            setButtonFrame(button, 0);
        });
        */
    }  
  update() {
        
    }
}