
function setButtonFrame(button, frame)
{
    button.frame = button.scene.textures.getFrame('button', frame);
} 


class ProvePerGioco extends Phaser.Scene {
    constructor() {
		super({ key: 'ProvePerGioco' })
    }
 

init(data){ 
        this.data.set('level', data.level);
        this.data.set('lives', data.lives);
        this.data.set('score', data.score);
        this.data.set('playername', data.playername );
    }

preload() {
        this.load.spritesheet('button', './assets/flixel-button.png', { frameWidth: 80, frameHeight: 20 });
        this.load.image('bg', './assets/cougar-dragonsun.png');
        this.load.audio('musicaMenu', './assets/MusicaMenu.mp3');
    }
create() {
    //servirà per Mettere i Nomi ai bottoni
        const BottoniNomi = [
        { name: 'Facile (Inferno)', },
        { name: 'Normale (Purgatorio)'},
        { name: 'Difficile (Paradiso)'},
        ]
        var bg = this.add.image(400, 300, 'bg');
        bg.setScale(800/bg.width, 600/bg.height);
        var MusicaIniziale = this.sound.add('musicaMenu');
        MusicaIniziale.setLoop(true);
        MusicaIniziale.play();
        //Testo Titolo
        this.add.text(235, 30, `${GameState.title}` , { font: '48px Bold Courier', fill: '#ffffff', shadow: '#ccc 0 1px 0, #c9c9c9 0 2px 0, #bbb 0 3px 0, #b9b9b9 0 4px 0, #aaa 0 5px 0,rgba(0,0,0,.1) 0 6px 1px, rgba(0,0,0,.1) 0 0 5px, rgba(0,0,0,.3) 0 1px 3px, rgba(0,0,0,.15) 0 3px 5px, rgba(0,0,0,.2) 0 5px 10px, rgba(0,0,0,.2) 0 10px 10px, rgba(0,0,0,.1) 0 20px 20px'});
        
        // Dati di gioco

        if (isNaN(this.data.get('score')) ) {
            this.data.set('score', 0);
        }
        if (isNaN(this.data.get('lives')) ) {
            this.data.set('lives', 0);
        }
        if (isNaN(this.data.get('level')) ) {
            this.data.set('level', '');
        }
        /*
        if (isNaN(this.data.get('playername')) ) {
            this.data.set('playername', 'Anonimo');
        }
        */
        // Inserisco dati di gioco
        var text = this.add.text(80, 100, '', { font: '20px Courier', fill: '#ffffff' });
        text.setText([
            'Player: ' + this.data.get('playername'),
            'Level: ' + this.data.get('level'),
            //'Lives: ' + this.data.get('lives'),
            'Score: ' + this.data.get('score')
        ]);


        //Inizio Definizione Bottoni
        var Bottone1 = this.add.sprite(400, GameState.separator*1, 'button').setScale(3, 3);
        var Bottone2 = this.add.sprite(400, GameState.separator*2, 'button').setScale(3, 3);
        var Bottone3 = this.add.sprite(400, GameState.separator*3, 'button').setScale(3, 3);
        //aggiungo il testo ai bottoni
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


        // stabilisco che bottoni abilitare
        Bottone1.Enabled = false;
        if(this.data.get('score') < GameState.ScoreLivello1Inferno) {
            Bottone1.setInteractive();
        }
        if (this.data.get('score') >= GameState.ScoreLivello1Inferno &&  this.data.get('score') < GameState.ScoreLivello1Purgatorio) {
            Bottone2.setInteractive();
        }
        if(this.data.get('score') >= GameState.ScoreLivello1Purgatorio) {
            Bottone3.setInteractive();
        } 

        //codice per stabilire cosa succede quando clicca il primo bottone
        Bottone1.on('pointerdown', function (pointer) {
            this.cameras.main.fade(500);
            this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
                    this.data.set('level','Inferno');
                    this.scene.stop('ProvePerGioco');
                    this.scene.start('ScenaInferno', { level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score'), playername : this.data.get('playername') });   
                }, this);
        }, this);
        //codice per stabilire cosa succede quando clicca il secondo bottone
        Bottone2.on('pointerdown', function (pointer) {
            this.cameras.main.fade(500);
            this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
                    this.data.set('level', 'Purgatorio');
                    this.scene.stop('ProvePerGioco');
                    this.scene.start('ScenaPurgatorio', { level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score'), playername : this.data.get('playername') });   
                }, this);
        }, this);
        //codice per stabilire cosa succede quando clicca il terzo bottone
        Bottone3.on('pointerdown', function (pointer) {
            this.cameras.main.fade(500);
            this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
                    this.data.set('level', 'Paradiso');
                    this.scene.stop('ProvePerGioco');
                    this.scene.start('ScenaParadiso', { level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score'), playername : this.data.get('playername') });   
                }, this);
        }, this);
        this.input.on('gameobjectdown', function (pointer, button)
        {
            setButtonFrame(button, 2);
            MusicaIniziale.stop();
                
            }, this);
        this.input.on('gameobjectup', function (pointer, button)
        {
            setButtonFrame(button, 0);
        });
        
    }  
  update() {
        
    }
}

