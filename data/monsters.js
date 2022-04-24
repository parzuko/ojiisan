const monsters = {
  Emby: {
    position: {
      x: 280,
      y: 325
    },
    image: {
      src: 'assets/astaDance.png'
    },
    frames: {
      max: 4,
      hold: 30
    },
    animate: true,
    name: 'You',
    attacks: [attacks.Reconsider, attacks.Flamethrower]
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
    attacks: [attacks.Reconsider, attacks.Love]
  }
}
