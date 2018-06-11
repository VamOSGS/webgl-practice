export function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log('Error compiling shader!');
    console.error('Shader error info: ', gl.getShaderInfoLog(shader));
    return false;
  }
  return shader;
}

export function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);
  gl.validateProgram(program);

  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error('Error validating program ', gl.getProgramInfoLog(program));
    return false;
  }
  return program;
}
