import vertex from './shaders/vertexShader.glsl';
import fragment from './shaders/fragmentShader.glsl';

let canvas;
let gl;
function initWebGL() {
  canvas = document.getElementById('canvas');
  gl = canvas.getContext('webgl');
  if (!gl) {
    console.log('Your browser dosen"t support webgl');
  }

  canvas.height = gl.canvas.clientHeight;
  canvas.width = gl.canvas.clientWidth;
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertex);
  gl.shaderSource(fragmentShader, fragment);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.log('Error compiling shader!');
    console.error('Shader error info: ', gl.getShaderInfoLog(vertexShader));
  }
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.log('Error compiling shader!');
    console.error('Shader error info: ', gl.getShaderInfoLog(fragmentShader));
  }

  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error('Error validating program ', gl.getProgramInfoLog(program));
    return;
  }

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // prettier-ignore
  const vertexArray = [
    // X, Y
    0.0, 0.5,
    0.5, -0.5,
    -0.5, -0.5,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);
  const positionAttribLocation = gl.getAttribLocation(program, 'vertexPosition');
  gl.vertexAttribPointer(
    positionAttribLocation,
    2,
    gl.FLOAT,
    gl.FALSE,
    2 * Float32Array.BYTES_PER_ELEMENT,
    0 * Float32Array.BYTES_PER_ELEMENT,
  );

  gl.enableVertexAttribArray(positionAttribLocation);
  gl.clearColor(0.75, 0.9, 1.0, 1.0);
  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

document.addEventListener('DOMContentLoaded', (e) => {
  initWebGL();
});
