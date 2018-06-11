attribute vec3 vertexPosition; 
attribute vec3 vertexColor;

varying vec3 fragmentColor;

void main(){
  fragmentColor = vertexColor;
  gl_Position = vec4(vertexPosition, 1);
}
