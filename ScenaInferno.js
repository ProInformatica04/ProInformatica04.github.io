function setButtonFrame(button, frame)
{
    button.frame = button.scene.textures.getFrame('button', frame);
} 


class ScenaInferno extends Phaser.Scene {
    constructor() {
		super({ key: 'ScenaInferno' })
    }
    

init(data){ 
        this.data.set('level', data.level);
        this.data.set('lives', data.lives);
        this.data.set('score', data.score);
        this.data.set('playername', data.playername );
    }
 
preload() {
        this.load.spritesheet('button', './assets/flixel-button.png', { frameWidth: 80, frameHeight: 20 });
        this.load.image('inferno', './assets/Inferno.jpg');
        this.load.audio('musicaInferno', './assets/MusicaInferno.mp3');
    }
create() {
        const BottoniNomi = [
        { name: 'Livello 1', },
        { name: 'Livello 2'},
        { name: 'Livello 3'},
        ]
        var back_i = this.add.image(400, 300, 'inferno');
        back_i.setScale(800/back_i.width, 600/back_i.height);
    
       GameState.MusicaInferno = this.sound.add('musicaInferno');
       GameState.MusicaInferno.setLoop(true);
       GameState.MusicaInferno.play();
        
        //Testo Titolo
        var Titolo= this.add.text(200, 50, `${GameState.title} Inferno` , { font: '48px Bold Courier', fill: '#FFFFFF', shadow: '#ccc 0 1px 0, #c9c9c9 0 2px 0, #bbb 0 3px 0, #b9b9b9 0 4px 0, #aaa 0 5px 0,rgba(0,0,0,.1) 0 6px 1px, rgba(0,0,0,.1) 0 0 5px, rgba(0,0,0,.3) 0 1px 3px, rgba(0,0,0,.15) 0 3px 5px, rgba(0,0,0,.2) 0 5px 10px, rgba(0,0,0,.2) 0 10px 10px, rgba(0,0,0,.1) 0 20px 20px'});
        Titolo.stroke = "#778fde";
        Titolo.strokeThickness = 100;
        Titolo.fill = '#43d637'
        Titolo.setShadow(2, 2, "#77b0de", 2, true, true);
        

        // Scritta in mezzo
        var TestoInMezzo =this.add.text(60, 250,  'Utilizza le quattro freccette nella parte bassa della tastiera per muoverti, \n Rimarrai in Inferno fino a raggiungere il punteggio: '+GameState.ScoreLivello1Inferno, {font: '24px Bold', fill: '#FFFFFF'})
        // this.add.text(140, 290,  'Rimarrai in Inferno fino a raggiungere il punteggio: '+GameState.ScoreLivello1Inferno, {font: '24px Bold', fill: '#FFFFFF'})
        TestoInMezzo.stroke = "#778fde";
        TestoInMezzo.strokeThickness = 50;
        //  Apply the shadow to the Stroke and the Fill (this is the default)
        TestoInMezzo.setShadow(2, 2, "#77b0de", 2, true, true);
        TestoInMezzo.setBackgroundColor("#f75f39");



        // Dati di gioco

        if (isNaN(this.data.get('score')) ) {
            this.data.set('score', 0);
        }
      
        // Inserisco dati di gioco
        var text = this.add.text(70, 100, '', { font: '20px Courier Bold', fill: '#FFFFFF' });

        text.setText([
            'Player: ' + this.data.get('playername'),
            'Level: ' + this.data.get('level'),
            //'Lives: ' + this.data.get('lives'),
            'Score: ' + this.data.get('score')
        ]);

        text.stroke = "#778fde";
        text.strokeThickness = 50;
        text.setShadow(2, 2, "#77b0de", 2, true, true);

        GameState.timer = this.time.delayedCall(3000, function() {
            this.cameras.main.fade(500);
            this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
                    this.scene.stop('ScenaInferno');   
                    this.scene.start('GiocoInferno',{ level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score'), playername : this.data.get('playername') });   
                }, this);
        }, [], this)
        /*
        //Inizio Definizione Bottoni
        var Bottone1 = this.add.sprite(400, GameState.separator*1, 'button').setInteractive().setScale(3, 3);
        var Bottone2 = this.add.sprite(400, GameState.separator*2, 'button').setInteractive().setScale(3, 3);
        var Bottone3 = this.add.sprite(400, GameState.separator*3, 'button').setInteractive().setScale(3, 3);
        //Testo bottoni
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
            
        });

        //codice per stabilire cosa succede quando clicca il primo bottone
        Bottone1.on('pointerdown', function (pointer) {
            this.cameras.main.fade(500);
            this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
                    this.scene.stop('ProvePerGioco');
                    this.scene.start('ScenaParadiso',{ level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score'), playername : this.data.get('playername') });   
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
         fine scena configurazione bottoni per 3 livelli */ 
    }  
  update() {
        
    }
}