

function Ship(model){
	this.position = vec3.create();
	this.model = model;
	this.move_speed = 0.02;
	this.hp = 5;

	this.rotate_matrix = mat4.create();
	this.translate_matrix = mat4.create();
	this.scale_matrix = mat4.create();
	this.model_matrix = mat4.create();
	mat4.identity(this.rotate_matrix);
	mat4.identity(this.translate_matrix);
	mat4.identity(this.scale_matrix);
	mat4.identity(this.model_matrix);
}

Ship.prototype.getModelMatrix = function(){
	mat4.multiply(this.translate_matrix, this.rotate_matrix, this.model_matrix);
	mat4.multiply(this.model_matrix, this.scale_matrix, this.model_matrix);
	return this.model_matrix;
}

Ship.prototype.update = function(){

	mat4.rotate(this.rotate_matrix , degToRad(1), [0, 1, 0]);
	
	if (currentlyPressedKeys["a"]) {// Left cursor key
		mat4.translate(this.translate_matrix , [-0.02, 0, 0]);
	}
	if (currentlyPressedKeys["d"]) {// Right cursor key
		mat4.translate(this.translate_matrix , [0.02, 0, 0]);
	}
	if (currentlyPressedKeys["w"]) {// Up cursor key
		mat4.translate(this.translate_matrix , [0, 0, -0.02]);
	}
	if (currentlyPressedKeys["s"]) {// Down cursor key
		mat4.translate(this.translate_matrix , [0, 0, 0.02]);
	}
}

