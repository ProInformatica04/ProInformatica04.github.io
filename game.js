const GameState = {
    gameOver: false,
    separator: 170,
    title: 'Divine Platformer',
    inGameWidth: 5000,
    inGameHeight: 600,
}
const config = {
    type: Phaser.AUTO,
    parent: 'divId',
    width: 800,
    height: 600,
    
    dom: {
        createContainer: true
    },
    scene: [ScenaIniziale, ProvePerGioco, ScenaParadiso, ScenaInferno, ScenaPurgatorio, ScenaProva, ], 
    physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 800 },
		}
	},
    audio: {
        disableWebAudio: true,
    },
    
};

const game = new Phaser.Game(config);