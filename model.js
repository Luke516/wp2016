var loaded = 0;

function Model(){
	this.vertices = [];
	this.uvs = [];
	this.normals = [];
	this.rotate_matrix = mat4.create();
	this.translate_matrix = mat4.create();
	this.scale_matrix = mat4.create();
	this.model_matrix = mat4.create();
	mat4.identity(this.rotate_matrix);
	mat4.identity(this.translate_matrix);
	mat4.identity(this.scale_matrix);
	mat4.identity(this.model_matrix);
}

Model.prototype.getModelMatrix = function(){
	mat4.multiply(this.translate_matrix, this.rotate_matrix, this.model_matrix);
	mat4.multiply(this.model_matrix, this.scale_matrix, this.model_matrix);
	return this.model_matrix;
}

Model.prototype.sayVertices = function(){
	alert(this.vertices);
}

loadObj = function(model, file) {

	var out = document.getElementById('out');
	var tmp_vertices=[], tmp_uvs=[], tmp_normals=[], tmps=[], f=[];
	var indices=[];
	$.get(file, function(data) {
        //alert(data);
    
	    var substrings = data.replace( /\n/g, ' ').split(' ');
	    /*for(var i=0; i<substrings.length; i++){
	    	out.value+=substrings[i];
	    	out.value+='\n';
	    }*/

	    for(var i=0; i<substrings.length; i++){
	    	//alert(substrings[i]);
	    	if(substrings[i] === "v"){
				tmp_vertices.push(substrings[++i]);
	    		tmp_vertices.push(substrings[++i]);
	    		tmp_vertices.push(substrings[++i]);

	    		//alert("v : "+tmps[0]+tmps[1]+tmps[2]);
	    	}
	    	if(substrings[i] === "vt"){
	    		tmp_uvs.push(substrings[++i]);
	    		tmp_uvs.push(substrings[++i]);
	    	}
	    	if(substrings[i] === "vn"){
	    		tmp_normals.push(substrings[++i]);
	    		tmp_normals.push(substrings[++i]);
	    		tmp_normals.push(substrings[++i]);
	    	}
	    	if(substrings[i] === "f"){
	    		f = [];
	    		f[0] = substrings[i+1].split('/');
	    		f.push(substrings[i+2].split('/'));
	    		f.push(substrings[i+3].split('/'));

	    		//alert(f[3]);

	    		indices.push(f[0][0]);
	    		indices.push(f[0][1]);
	    		indices.push(f[0][2]);
	    		indices.push(f[1][0]);
	    		indices.push(f[1][1]);
	    		indices.push(f[1][2]);
	    		indices.push(f[2][0]);
	    		indices.push(f[2][1]);
	    		indices.push(f[2][2]);
	    	}
	    }
	    model.vertices=[];
	    model.uvs=[];
	    model.normals=[];
	    for (var i = 0; i < indices.length; i += 3) {
			model.vertices.push(tmp_vertices[(indices[i] - 1) * 3]);
			model.vertices.push(tmp_vertices[(indices[i] - 1) * 3 + 1]);
			model.vertices.push(tmp_vertices[(indices[i] - 1) * 3 + 2]);
			model.uvs.push(tmp_uvs[(indices[i + 1] - 1) * 2]);
			model.uvs.push(tmp_uvs[(indices[i + 1] - 1) * 2+1]);
			model.normals.push(tmp_normals[(indices[i + 2] - 1) * 3]);
			model.normals.push(tmp_normals[(indices[i + 2] - 1) * 3 + 1]);
			model.normals.push(tmp_normals[(indices[i + 2] - 1) * 3 + 2]);

		}
		loaded++;
		//alert(model.vertices);
		for(var i=0; i<model.vertices.length; i++){
	    	out.value+=model.vertices[i];
	    	out.value+='\n';
	    }
	});
	//alert("QWQ");
	//alert(model.vertices);
}

