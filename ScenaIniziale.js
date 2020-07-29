class ScenaIniziale extends Phaser.Scene {
    constructor() {
		super({ key: 'ScenaIniziale' })
    }
    
    preload() {
        this.load.html('nameform', './assets/text/loginform.html');
        this.load.image('bgi', './assets/cougar-dragonsun.png');
        this.load.spritesheet('button', './assets/flixel-button.png', { frameWidth: 80, frameHeight: 20 });
    }
    create (){
        
        var bg_ini = this.add.image(400, 300, 'bgi');
        bg_ini.setScale(800/bg_ini.width, 600/bg_ini.height);
        this.add.text(10, 20, `Benvenuto in questa nuova fantastica avventura!` , { font: '40px Bold Courier', align: 'center', fill: '#ffffff', shadow: '#ccc 0 1px 0, #c9c9c9 0 2px 0, #bbb 0 3px 0, #b9b9b9 0 4px 0, #aaa 0 5px 0,rgba(0,0,0,.1) 0 6px 1px, rgba(0,0,0,.1) 0 0 5px, rgba(0,0,0,.3) 0 1px 3px, rgba(0,0,0,.15) 0 3px 5px, rgba(0,0,0,.2) 0 5px 10px, rgba(0,0,0,.2) 0 10px 10px, rgba(0,0,0,.1) 0 20px 20px'});
        this.add.text(40, 70, `Sfida le creature mostruose dell'Inferno, \n Affronta le dure prove del Purgatorio e accumulando punti...arriverai \n in Paradiso!` , { font: '25px Bold Courier', align: 'center', fill: '#ffffff', shadow: '#ccc 0 1px 0, #c9c9c9 0 2px 0, #bbb 0 3px 0, #b9b9b9 0 4px 0, #aaa 0 5px 0,rgba(0,0,0,.1) 0 6px 1px, rgba(0,0,0,.1) 0 0 5px, rgba(0,0,0,.3) 0 1px 3px, rgba(0,0,0,.15) 0 3px 5px, rgba(0,0,0,.2) 0 5px 10px, rgba(0,0,0,.2) 0 10px 10px, rgba(0,0,0,.1) 0 20px 20px'});
        var text = this.add.text(227, 150, 'Per favore scegli il tuo nome', { color: 'white', fontFamily: 'Bold Courier', fontSize: '25px ', align: 'center'});
        //inizializzo il nome del Player
        this.data.set('playername', '');
        
        var Bottone = this.add.sprite(400, 300, 'button').setInteractive().setScale(3, 3);
        this.add.text( 330, 290, 'Click to start!', {fill: '#000000 ', fontSize: '24px Bold'})
        var PlayerN=''
        // Dati di gioco

        if (isNaN(this.data.get('score')) ) {
            this.data.set({score : 0});
        }
        if (isNaN(this.data.get('lives')) ) {
            this.data.set('lives', 0);
        }
        if (isNaN(this.data.get('level')) ) {
            this.data.set('level', 0);
        }
        if (isNaN(this.data.get('playername')) ) {
            this.data.set({playername : PlayerN});
        }

        var element = this.add.dom(370, 370).createFromCache('nameform');

        element.setPerspective(800);
    
        element.addListener('click');

        element.on('click', function (event) {

            if (event.target.name === 'loginButton')
            {
                var inputUsername = element.getChildByName('username');
                //var inputPassword = this.getChildByName('password');
    
                //  Have they entered anything?
                if (inputUsername.value !== '')
                    {
                        //  Turn off the click events
                        element.removeListener('click');

                        //  Tween the login form out
                        element.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

                        element.scene.tweens.add({ targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
                            onComplete: function ()
                            {
                                element.setVisible(false);
                            }
                        });

                        //  Populate the text with whatever they typed in as the username!
                        PlayerN=inputUsername.value
                        text.setText('                                     \n            Welcome ' + PlayerN+' !!!');  
                        this.data.set('playername', inputUsername.value);
                    }
                    else
                    {
                        //  Flash the prompt
                        //this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                        inputUsername.value='Anonimo';
                        PlayerN=inputUsername.value;
                        this.data.set('playername', inputUsername.value);
                    }
            }
    
        },this);



        this.tweens.add({
            targets: element,
            y: 350,
            duration: 3000,
            ease: 'Power3'
        });



        Bottone.on('pointerdown', function (pointer) {
            if (PlayerN !== '') 
            {
                this.cameras.main.fade(500);
                this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
                        this.scene.stop('ScenaIniziale');
                        this.scene.start('ProvePerGioco', { level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score'), playername : this.data.get('playername') });   
                    }, this);
                }
        }, this);

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
        
    }

}