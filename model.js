
function Model(_vertices){
	this.vertices = _vertices;
	this.rotate_matrix = mat4.create();
	this.translate_matrix = mat4.create();
	this.scale_matrix = mat4.create();
	this.model_matrix = mat4.create();
}


function readObjFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}