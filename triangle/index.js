import vertex from './shaders/vertexShader.glsl';
import fragment from './shaders/fragmentShader.glsl';
import { createProgram, createShader } from './src/functions';

let canvas;
let gl;
let program;

function initWebGL() {
  canvas = document.getElementById('canvas');
  gl = canvas.getContext('webgl');
  if (!gl) {
    console.log('Your browser dosen"t support webgl');
  }

  canvas.height = gl.canvas.clientHeight;
  canvas.width = gl.canvas.clientWidth;
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment);

  program = createProgram(gl, vertexShader, fragmentShader);

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // prettier-ignore
  const vertexArray = [
    // X, Y, Z, R, G, B
    0, 0.5, 0, 0.2, 1.5, 1,
    -0.5, -0.5, 0, 0.2, 0.5, 1,
    0.5, -0.5, 0, 0.2, 0.5, 1,

    0, -0.5, 0.5, 1, 0, 0,
    -0.5, 0.5, 0.5, 0, 0, 0,
    0.5, 0.5, 0.5, 0, 0, 0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);
  const positionAttribLocation = gl.getAttribLocation(program, 'vertexPosition');
  gl.vertexAttribPointer(
    positionAttribLocation,
    3,
    gl.FLOAT,
    gl.FALSE,
    6 * Float32Array.BYTES_PER_ELEMENT,
    0 * Float32Array.BYTES_PER_ELEMENT,
  );
  gl.enableVertexAttribArray(positionAttribLocation);

  const colorAttribLocation = gl.getAttribLocation(program, 'vertexColor');
  gl.vertexAttribPointer(
    colorAttribLocation,
    3,
    gl.FLOAT,
    gl.FALSE,
    6 * Float32Array.BYTES_PER_ELEMENT,
    3 * Float32Array.BYTES_PER_ELEMENT,
  );
  gl.enableVertexAttribArray(colorAttribLocation);

  gl.clearColor(0.75, 0.9, 1.0, 1.0);
  // eslint-disable-next-line
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, vertexArray.length / 6);
}

document.addEventListener('DOMContentLoaded', (e) => {
  initWebGL();
});
