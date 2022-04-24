const monsters = {
  Emby: {
    position: {
      x: 280,
      y: 325
    },
    image: {
      src: 'assets/embySprite.png'
    },
    frames: {
      max: 4,
      hold: 30
    },
    animate: true,
    name: 'Emby',
    attacks: [attacks.Tackle, attacks.Fireball]
  },
  Grandfather: {
    position: {
      x: 800,
      y: 100
    },
    image: {
      src: 'assets/grandfather.png'
    },
    frames: {
      max: 4,
      hold: 30
    },
    animate: true,
    isEnemy: true,
    name: 'Grandfather',
    attacks: [attacks.Tackle, attacks.Fireball]
  }
}
