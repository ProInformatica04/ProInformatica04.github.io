class SceneA extends Phaser.Scene {

    constructor ()
    {
        super('SceneA');
    }

    init(data){
        this.data.set('level', data.level=data.level );
        this.data.set('lives', data.lives=data.lives );
        this.data.set('score', data.score=data.score );
    }

    preload ()
    {
        this.load.setPath('assets/loader-tests/');
        this.load.atlas('megaset', [ 'texture-packer-atlas-with-normals-0.png', 'texture-packer-atlas-with-normals-0_n.png' ], 'texture-packer-atlas-with-normals.json');
    }

    create ()
    {
        this.lights.enable();

        this.lights.addLight(300, 300, 300, 0xff0000, 1);
        this.lights.addLight(400, 300, 300, 0x00ff00, 1);
        this.lights.addLight(600, 500, 300, 0x0000ff, 1);
       
        if (isNaN(this.data.get('score')) ) {
            this.data.set('score', 3);
        }
        if (isNaN(this.data.get('lives')) ) {
            this.data.set('lives', 2);
        }
        if (isNaN(this.data.get('level')) ) {
            this.data.set('level', 1);
        }
   
        this.input.on('pointerup', function (pointer) {

            this.scene.start('SceneB', { level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score') });
            this.scene.stop('SceneA');

        }, this);

        let atlasTexture = this.textures.get('megaset');

        let frames = atlasTexture.getFrameNames();

        Phaser.Utils.Array.Shuffle(frames);

        for (let i = 0; i < frames.length; i++)
        {
            let x = Phaser.Math.Between(100, 700);
            let y = Phaser.Math.Between(100, 500);

            this.add.image(x, y, 'megaset', frames[i]).setPipeline('Light2D');
        }

        this.add.image(120, 160, 'megaset', 'contra2');

        var text = this.add.text(100, 100, '', { font: '64px Courier', fill: '#00ff00' });

    text.setText([
        'Level: ' + this.data.get('level'),
        'Lives: ' + this.data.get('lives'),
        'Score: ' + this.data.get('score')
    ]);
    }
}

class SceneB extends Phaser.Scene {

    constructor ()
    {
        super('SceneB');
    }

    init(data){    
        this.data.set('level', data.level=data.level+1 );
        this.data.set('lives', data.lives=data.lives+1 );
        this.data.set('score', data.score=data.score+1 );
    }

    create ()
    {
        this.lights.enable();

        let atlasTexture = this.textures.get('megaset');

        let frames = atlasTexture.getFrameNames();

        Phaser.Utils.Array.Shuffle(frames);


        this.input.on('pointerup', function (pointer) {

            this.scene.start('SceneA', { level : this.data.get('level'), lives : this.data.get('lives'), score : this.data.get('score') });
            this.scene.stop('SceneB');
        }, this);


        for (let i = 0; i < frames.length; i++)
        {
            let x = Phaser.Math.Between(100, 700);
            let y = Phaser.Math.Between(100, 500);

            this.add.image(x, y, 'megaset', frames[i]).setPipeline('Light2D');
        }

        this.add.image(120, 160, 'megaset', 'contra2');

         var text = this.add.text(100, 100, '', { font: '64px Courier', fill: '#00ff00' });

    text.setText([
        'Level: ' + this.data.get('level'),
        'Lives: ' + this.data.get('lives'),
        'Score: ' + this.data.get('score')
    ]);
    }
}

var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [ SceneA, SceneB ]
};

var game = new Phaser.Game(config);
