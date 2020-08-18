const GameState = {
    gameOver: false,
    separator: 170,
    title: 'Divine Platformer',
    inGameWidth: 2000,
    inGameHeight: 600,
    ScoreLivello1Inferno: 20,
    ScoreLivello2Inferno: 40,
    ScoreLivello3Inferno: 60,
    ScoreLivello1Purgatorio: 50,
    ScoreLivello2Purgatorio: 70,
    ScoreLivello3Purgatorio: 90,
    ScoreLivello1Paradiso: 90,
    ScoreLivello2Paradiso: 110,
    ScoreLivello3Paradiso: 130,

}
const config = {
    type: Phaser.AUTO,
    parent: 'divId',
    width: 800,
    height: 600,
    
    dom: {
        createContainer: true
    },
    scene: [ScenaIniziale, ProvePerGioco, ScenaParadiso, ScenaInferno, ScenaPurgatorio, GiocoParadiso, GiocoInferno, GiocoPurgatorio, ScenaRiepilogo], 
    physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		}
	},
    audio: {
        disableWebAudio: true,
    },
    
};

const game = new Phaser.Game(config);