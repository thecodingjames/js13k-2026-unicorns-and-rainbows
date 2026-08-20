'use strict';

const WORLD_WIDTH = 1920
const WORLD_HEIGHT = 1080
const WORLD_SCALE = 64

function w(value) {
  return WORLD_WIDTH / WORLD_SCALE * (value / 100)
}

function h(value) {
  return WORLD_HEIGHT / WORLD_SCALE * (value / 100)
}

function x(value) {
  return w(value) / 2
}

function y(value) {
  return h(value) / 2
}

class Background extends EngineObject {
  
  render() {
    drawCircle(vec2(0,5), 2, GREEN);
    drawRect(cameraPos, getCameraSize(), new Color(120/ 255, 215 / 255, 255 / 255));
  }

}
class Ground extends EngineObject {

  render() {
    drawRect(this.pos, this.size, new Color(79 / 255, 0 / 255, 0 / 255));
    drawRect(vec2(0, y(-80)), vec2(w(100), h(5)), new Color(0 / 255, 255 / 255, 0 / 255));
  }

}


class Scene extends EngineObject {
  static _scenes =  { }

  static get(name) {
    return Scene._scenes[name]
  }

  static instantiate(name) {
    const scene = eval(`new ${name[0].toUpperCase()}${name.substring(1)}Scene()`)

    Scene._scenes[name] = scene

    return scene
  }

  transition(name) {
    const destination = Scene.instantiate(name)

    this.destroy()
  }

  constructor(color = new Color(0, 0, 0)) {
    super(vec2(0, 0), vec2(w(100), h(100)), 0, 0, color);
  }
}

class LauncherScene extends Scene {

  constructor() {
    super()

    new Background()
    new Ground( vec2(0, y(-90)), vec2(w(100), h(10)) )
  }

  update() {
    if (keyWasPressed('Space')) {
      this.transition('game')
    }
  }

  render() {
    const ctx = overlayContext;

    ctx.save();

    ctx.font = 'bold 160px Arial';
    ctx.textAlign = 'center';

    const start  = worldToScreen(new vec2(x(0), y(25)))
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

class PauseScene extends Scene {

  updatePost() {
    if (keyWasPressed('Escape')) {
      setPaused(!paused)
    }
  }

  render() {
    if (!paused) return

    drawCircle(vec2(0,5), 2, GREEN);
  }
}

class GameScene extends Scene {

  constructor() {
    super()

    Scene.instantiate('pause')
  }

  update() {
  }

  render() {
    drawCircle(vec2(0,5), 3+oscillate(.5), RED);
  }

}

///////////////////////////////////////////////////////////////////////////////
// _init
function gameInit()
{
  setDebugKey('F8')

  canvasFixedSize = vec2(WORLD_WIDTH, WORLD_HEIGHT);
  cameraScale = WORLD_SCALE;

  Scene.instantiate('launcher')
}

///////////////////////////////////////////////////////////////////////////////
// _update
function gameUpdate() {

}

///////////////////////////////////////////////////////////////////////////////

function gameUpdatePost() {
  Scene.get('pause')?.updatePost()
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
