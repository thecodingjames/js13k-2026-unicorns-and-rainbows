'use strict';

const WORLD_WIDTH = 1920
const WORLD_HEIGHT = 1080
const WORLD_SCALE = 64

function x(value) {
  return WORLD_WIDTH / WORLD_SCALE * value   
}

function y(value) {
  return WORLD_HEIGHT / WORLD_SCALE * value   
}

class Scene extends EngineObject {
  static _name = null
  static _instance = null 

  static instantiate(name) {
    const scene = {

      launcher: () => {
        return new LauncherScene()  
      },

      game: () => {
        return new GameScene()  
      },

    }[name]()

    if (Scene._instance == null) {
      Scene._name = name
      Scene._instance = scene
    }

    return scene
  }

  static transition(name) {
    const destination = Scene.instantiate(name)

    Scene._instance.destroy()

    Scene._name = name
    Scene._instance = destination
  }

  constructor(color = new Color(0, 0, 0)) {
      super(vec2(0, 0), vec2(x(100), y(100)), 0, 0, color);
  }
}

class LauncherScene extends Scene {

  update() {
  }

  render() {
    const ctx = mainContext;

    ctx.save();

    ctx.font = 'bold 160px Arial';
    ctx.textAlign = 'center';

    const start  = worldToScreen(new vec2(x(0), y(0.25)))
    const width = 650

    const gradient = ctx.createLinearGradient(start.x - width / 2, start.y, start.x + width / 2, start.y);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(.166, 'orange');
    gradient.addColorStop(.332, 'yellow');
    gradient.addColorStop(.498, 'green');
    gradient.addColorStop(.664, 'blue');
    gradient.addColorStop(.83, 'indigo');
    gradient.addColorStop(1, 'violet');

    ctx.fillStyle = gradient;
    ctx.fillText('Spectrum', start.x, start.y, width);

    ctx.fillStyle = 'white';
    ctx.fillText('ru', start.x + 129, start.y, width - 510);
    ctx.fillText('n', start.x + 240, start.y, width - 570);

    ctx.restore();
  }
}

class GameScene extends Scene {

  render() {
    drawCircle(vec2(0,5), 3+oscillate(.5), RED);
  }
}

///////////////////////////////////////////////////////////////////////////////
// _init
function gameInit()
{
  canvasFixedSize = vec2(WORLD_WIDTH, WORLD_HEIGHT);
  cameraScale = WORLD_SCALE;

  Scene.instantiate('launcher')
  
  setTimeout(() => {
    Scene.transition('game')
  }, 2000)
}

///////////////////////////////////////////////////////////////////////////////
// _update
function gameUpdate() {

}

///////////////////////////////////////////////////////////////////////////////

function gameUpdatePost() {

}

///////////////////////////////////////////////////////////////////////////////
// _render
function gameRender() {
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost() {
}

///////////////////////////////////////////////////////////////////////////////
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);
