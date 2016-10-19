var triangleVertexBuffer;
var triangleNormalBuffer;
var triangleUVBuffer; 

var cube;

var inited = false;

var draw_objects = [];
var update_objects = [];

function main(){
  var canvas = document.getElementById("lesson01-canvas");
  initGL(canvas);
	loadAllObjs();
  loadAllTextures()
	webGLStart();
}

function loadAllTextures(){
  initTexture("test.bmp");
}

function webGLStart() {
	if(loaded > 2){
		
    cube = new Ship(all_models[0]);
    //all_models[0].sayVertices();

	  initShaders();
	  initBuffers();

	  gl.clearColor(0.0, 0.0, 0.0, 1.0);
	  gl.enable(gl.DEPTH_TEST);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    update_objects.push(cube);

    //drawScene();
	  tick();
	}
	else{
		setTimeout(webGLStart, 500);
	}
  
}

function tick() {
  //alert("tick");
  requestAnimFrame(tick); //from webgl-utils.js
  handleKeys();
  update();
  drawScene();
}

function update(){
  //alert("update");
  //mat4.rotate(cube.rotate_matrix , degToRad(1), [0, 1, 0]);
  update_objects.forEach(function(obj){
    obj.update();
  });
}

var currentlyPressedKeys = {};

function handleKeyDown(event) {
  currentlyPressedKeys[event.key] = true;

}

function handleKeyUp(event) {
  currentlyPressedKeys[event.key] = false;
}

function handleKeys() {
  if (currentlyPressedKeys["a"]) {// Left cursor key
    mat4.translate(cube.translate_matrix , [-0.02, 0, 0]);
  }
  if (currentlyPressedKeys["d"]) {// Right cursor key
    mat4.translate(cube.translate_matrix , [0.02, 0, 0]);
  }
  if (currentlyPressedKeys["w"]) {// Up cursor key
    mat4.translate(cube.translate_matrix , [0, 0, -0.02]);
  }
  if (currentlyPressedKeys["s"]) {// Down cursor key
    mat4.translate(cube.translate_matrix , [0, 0, 0.02]);
  }
}

var rTri = 0;
var rSquare = 0;

function initBuffers() {
  triangleVertexBuffer = gl.createBuffer();
  triangleNormalBuffer = gl.createBuffer();
  triangleUVBuffer = gl.createBuffer();

  //cube.sayVertices();
  //alert("123");
  //alert(cube.vertices);
  //alert(cube.model.vertices.length);
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.model.vertices), gl.STATIC_DRAW);
  triangleVertexBuffer.itemSize = 3;
  triangleVertexBuffer.numItems = cube.model.vertices.length / triangleVertexBuffer.itemSize;
  //gl.enableVertexAttribArray(0);

  gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.model.normals), gl.STATIC_DRAW);
  triangleNormalBuffer.itemSize = 3;
  triangleNormalBuffer.numItems = cube.model.normals.length / triangleNormalBuffer.itemSize;
  //gl.enableVertexAttribArray(1);

  gl.bindBuffer(gl.ARRAY_BUFFER, triangleUVBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.model.uvs), gl.STATIC_DRAW);
  triangleUVBuffer.itemSize = 2;
  triangleUVBuffer.numItems = cube.model.uvs.length / triangleUVBuffer.itemSize;
  //gl.enableVertexAttribArray(2);

}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function drawScene() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
  mat4.identity(vMatrix);
  mat4.lookAt([0,10,1], [0,0,0], [0,1,0], vMatrix);
  //alert(vMatrix);
  //mat4.translate(vMatrix, [-1.5, 0.0, -7.0]);
	//mat4.rotate(vMatrix, degToRad(rTri), [0, 1, 0]);

	//setMatrixUniforms();

  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
  gl.vertexAttribPointer(shaderProgram.normalPositionAttribute, triangleNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleUVBuffer);
  gl.vertexAttribPointer(shaderProgram.uvPositionAttribute, triangleUVBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture_id);
 
  setMatrixUniforms();
  gl.uniform1i(shaderProgram.samplerUniform, 0); //0 for texture 0

  gl.drawArrays(gl.TRIANGLES, 0, triangleVertexBuffer.numItems);
}

var gl;
function initGL(canvas) {
  try {
    gl = canvas.getContext("experimental-webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  } catch(e) {
  }
  if (!gl) {
    alert("Could not initialise WebGL, sorry :-( ");
  }
}

var vMatrix = mat4.create();
var pMatrix = mat4.create();

var shaderProgram;
function initShaders() {
  var fragmentShader = getShader(gl, "shader-fs");
  var vertexShader = getShader(gl, "shader-vs");

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("Could not initialise shaders");
  }

  gl.useProgram(shaderProgram);
  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  shaderProgram.normalPositionAttribute = gl.getAttribLocation(shaderProgram, "aNormalPosition");
  shaderProgram.uvPositionAttribute = gl.getAttribLocation(shaderProgram, "aUVPosition");

  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  gl.enableVertexAttribArray(shaderProgram.normalPositionAttribute);
  gl.enableVertexAttribArray(shaderProgram.uvPositionAttribute);

  shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "M");
  shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "V");
  shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "P");
}

function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3)
            str += k.textContent;
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function setMatrixUniforms() {
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
  gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, cube.getModelMatrix());
}

var texture_id;
function initTexture(image_src) {
  texture_id = gl.createTexture();
  texture_id.image = new Image();
  texture_id.image.onload = function() {
    handleLoadedTexture(texture_id)
  }
  texture_id.image.src = image_src;
}

function handleLoadedTexture(texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, texture.image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  //gl.bindTexture(gl.TEXTURE_2D, null);
  //alert("texture loaded");

  //gl.uniform1i(shaderProgram.samplerUniform, 0); /*0 for texture 0*/  alert("uniform1i");
  
  //gl.drawArrays(gl.TRIANGLES, 0, triangleVertexBuffer.numItems);
}

