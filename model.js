var loaded = 0;

var all_models = [];

function Model(){
	this.model_file = "";
	this.vertices = [];
	this.uvs = [];
	this.normals = [];
}

Model.prototype.sayVertices = function(){
	alert(this.vertices[0]);
}

Model.prototype.update = function(){
  //mat4.rotate(this.rotate_matrix , degToRad(1), [0, 1, 0]);
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

loadAllObjs = function() {
	all_models.push(new Model());
	all_models.push(new Model());
	all_models.push(new Model());
	loadObj(all_models[0], "ship01.obj");
	loadObj(all_models[1], "ship02.obj");
	loadObj(all_models[2], "ship03.obj");
	//cube.loadObj("ship01.obj");
}
