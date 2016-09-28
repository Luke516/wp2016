
function Model(_vertices){
	this.vertices = _vertices;
	this.rotate_matrix = mat4.create();
	this.translate_matrix = mat4.create();
	this.scale_matrix = mat4.create();
	this.model_matrix = mat4.create();
}


function readObjFile(file)
{
	$.get("cube.txt", function(data) {
        alert(data);
    });
}