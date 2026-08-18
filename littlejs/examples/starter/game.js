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

///////////////////////////////////////////////////////////////////////////////
// _init
function gameInit()
{
  canvasFixedSize = vec2(WORLD_WIDTH, WORLD_HEIGHT);
  cameraScale = WORLD_SCALE;
}

///////////////////////////////////////////////////////////////////////////////
// _update
function gameUpdate()
{

}

///////////////////////////////////////////////////////////////////////////////

function gameUpdatePost()
{

}

///////////////////////////////////////////////////////////////////////////////
// _render
function gameRender()
{
    // draw a grey square in the background without using webgl
    drawRect(vec2(0,0),vec2(x(100), y(0.5)), new Color(.6,.6,.6), 0, 0);
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
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

  // ctx.fillText('run', start.x + 172, start.y, width - 424);

  ctx.restore();
}

///////////////////////////////////////////////////////////////////////////////
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);
