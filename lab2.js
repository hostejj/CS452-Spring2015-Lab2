//Johnathon Hoste, 2/12/2015, Lab 2
var gl;
var points = [];
var color;
var deltax = 0.02;
var deltay = 0.02;
var numVerts = 16;

window.onload = function init(){

    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
		
	defineShape();
	
    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	color = gl.getUniformLocation(program, "uColor");
	
    // Load the data into the GPU  
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	render();

	//event listeners for keyboard 
	window.onkeydown = function(event) {
		var key = String.fromCharCode(event.keyCode);
		switch (key) {			
			case '1':
				//return shape to origin
				defineShape();
				gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
				render();
				break;
			case 'W':
				//move up
				alterPosition(1);
				render();
				break;
			case 'A':
				//move left
				alterPosition(2);
				render();
				break;
			case 'S':
				//move down
				alterPosition(3);
				render();
				break;
			case 'D':
				//move right
				alterPosition(4);
				render();
				break;
		}
	};
};

function render(){
    gl.clear( gl.COLOR_BUFFER_BIT );
	gl.uniform4f(color, 1, 0, 0, 1);
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 5 );
	gl.uniform4f(color, 0, 1, 0, 1);
    gl.drawArrays( gl.TRIANGLE_FAN, 5, 6 );	
	gl.uniform4f(color, 0, 0, 1, 1);
    gl.drawArrays( gl.TRIANGLE_FAN, 11, numVerts - 11);
}

function defineShape(){
	//should be a star when drawn in 3 parts 0-5, 5-11, 11-16
    var vertices = [
		vec2( 0.0, 0.0),
        vec2( 0.0,  0.4 ),
        vec2( 0.1,  0.15 ),
        vec2( 0.4,  0.15 ),
        vec2( 0.2,  -0.05 ),
		vec2( 0.0, 0.0),
		vec2( 0.2,  -0.05 ),
        vec2( 0.25, -0.4 ),
        vec2( 0.0, -0.2 ),
        vec2( -0.25, -0.4 ),
        vec2( -0.2, -0.05 ),
		vec2( 0.0, 0.0),
		vec2( -0.2, -0.05 ),
		vec2( -0.4, 0.15 ),
		vec2( -0.1, 0.15 ),
		vec2( 0.0, 0.4 )
    ];
	
	//clear the array
	while(points.length > 0) {
		points.pop();
	}
	
	// add values to the array
	for ( var i = 0; i < vertices.length; i++ ) {
        points.push( vertices[i] );
    }
}

function alterPosition(state){
	switch(state){
		case 1:
			for(var i = 0; i < numVerts; i++){
				points[i][1] += deltay;
			}
			gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
			break;
		case 2:
			for(var i = 0; i < numVerts; i++){
				points[i][0] -= deltax;
			}
			gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
			break;
		case 3:
			for(var i = 0; i < numVerts; i++){
				points[i][1] -= deltay;
			}
			gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
			break;
		case 4:
			for(var i = 0; i < numVerts; i++){
				points[i][0] += deltax;
			}
			gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
			break;
	}
}