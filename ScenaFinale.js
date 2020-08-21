


class ScenaFinale extends Phaser.Scene {
    constructor() {
		super({ key: 'ScenaFinale' })
    }
    

init(data){ 
        this.data.set('level', data.level);
        this.data.set('lives', data.lives);
        this.data.set('score', data.score);
        this.data.set('playername', data.playername );
    }
 
preload() {
    this.load.image('sfondoGesù', './assets/Jesus.png');
    }
create() {
    GameState.background_finale = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sfondoGesù'); 
    GameState.background_finale.setOrigin(0, 0)
    GameState.background_finale.setScale(2, 1.5)
}
  update() {
}
}