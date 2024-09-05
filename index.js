const fs = require('fs');

const single_tile = 32;
const map_size = [150,150];

var firstgid = 1;
var tiles = [];

var settings = [
	{
		"name": "[Base]BaseChip_pipo.tsx",
		"tilecount": 1000,
		"objects":[
			{
				"type": "l",
				"layer": 0,
				"probability": 1,
				"tiles": [
					[
						[0]
					]
				]
			},
			{
				"name": "flowers",
				"type": "l",
				"layer": 1,
				"probability": 0.1,
				"tiles": [
					[
						[48]
					],
					[
						[49]
					],
					[
						[51]
					],
					[
						[52]
					],
					[
						[53]
					],
					[
						[54]
					],
					[
						[55]
					]
				],
			},
			{
				"name": "rocks",
				"type": "l",
				"layer": 1,
				"probability": 0.001,
				"tiles": [
					[
						[64]
					],
					[
						[65]
					]
				],
			},
			{
				"name": "trunks",
				"type": "l",
				"layer": 1,
				"probability": 0.01,
				"tiles": [
					[
						[44]
					],
					[
						[45]
					]
				]
			},
			{
				"name": "decoration",
				"type": "l",
				"layer": 1,
				"probability": 0.001,
				"tiles": [
					[
						[67]
					],
					[
						[68]
					],
					[
						[69]
					]
				]
			},
			{
				"name": "plants",
				"type": "l",
				"layer": 1,
				"probability": 0.45,
				"tiles": [
					[
						[8,9],
						[16,17]
					],
					[
						[10,11],
						[18,19]
					]
				],
			},
			{
				"name": "city",
				"type": "c",
				"layer": 1,
				"probability": 1,
				"tiles": [
					[
						[70]
					]
				]
			},
		]
	},
	{
		"name": "Tileset Street.tsx",
		"tilecount": 64,
		"objects":[
			{
				"name": "street",
				"type": "s",
				"layer": 1,
				"probability": 1,
				"tiles": [
					[
						[32]
					],
					[
						[40]
					],
					[
						[48]
					],
					[
						[56]
					],
					[
						[33]
					],
					[
						[41]
					],
					[
						[49]
					],
					[
						[57]
					]
				]
			}
		]
	},
	{
		"name": "[A]Water_pipo.tsx",
		"tilecount": 3072,
		"objects":[
			{
				"type": "w",
				"layer": 0,
				"probability": 1,
				"tiles": [
					[
						[454]
					]
				]
			},
			{
				"type": "ll*lw****",
				"layer": 1,
				"probability": 1,
				"tiles": [
					[
						[389]
					]
				]
			},
			{
				"type": "*ll*wl***",
				"layer": 1,
				"probability": 1,
				"tiles": [
					[
						[391]
					]
				]
			},
			{
				"type": "lw*ll****",
				"layer": 1,
				"probability": 1,
				"tiles": [
					[
						[517]
					]
				]
			},
			{
				"type": "*wl*ll***",
				"layer": 1,
				"probability": 1,
				"tiles": [
					[
						[519]
					]
				]
			},
			{
				"type": "*l**w****",
				"layer": 1,
				"probability": 1,
				"tiles": [
					[
						[390]
					]
				]
			},
			{
				"type": "*w**l****",
				"layer": 1,
				"probability": 1,
				"tiles": [
					[
						[518]
					]
				]
			},
			{
				"type": "****wl***",
				"layer": 1,
				"probability": 1,
				"tiles": [
					[
						[455]
					]
				]
			},
			{
				"type": "***lw****",
				"layer": 1,
				"probability": 1,
				"tiles": [
					[
						[453]
					]
				]
			},
			{
				"type": "***!w*l!*",
				"layer": 1,
				"probability": 1,
				"tiles": [
					[
						[581]
					]
				]
			},
			{
				"type": "****w!*!l",
				"layer": 1,
				"probability": 1,
				"tiles": [
					[
						[580]
					]
				]
			},
			{
				"type": "*!l*w!***",
				"layer": 1,
				"probability": 1,
				"tiles": [
					[
						[644]
					]
				]
			},
			{
				"type": "l!*!w****",
				"layer": 1,
				"probability": 1,
				"tiles": [
					[
						[645]
					]
				]
			},
		]
	}
]

/*
			
			{
				"type": "houses",
				"layer": 1,
				"probability": 0.002,
				"tiles": [
					{
						"base": [
							[571,571,571],
							[579,579,579],
							[352,352,352],
							[352,352,352],
						],
						"detail": [
							[,,],
							[,,],
							[594,,361],
							[600,,367],
						]
					}
				]
			},			
		]
	}
]*/

//save file
function mapGen(filename, tiles){
	var tileset = "";
	var firstgid = 1;
	for(let t = 0; t < settings.length; t++){
		tileset += `<tileset firstgid="`+firstgid+`" source="`+settings[t]["name"]+`"/>`;
		firstgid +=	settings[t]["tilecount"];
	}

	var layer_txt = "";
	for(let i = 0; i < tiles.length; i++){
		layer_txt += `
		<layer id="`+(i+1)+`" name="Tile Layer `+(i+1)+`" width="`+map_size[0]+`" height="`+map_size[1]+`"> 
			<data encoding="csv">`+tiles[i].join(",")+`</data>
		</layer>`;
	}

	content = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.10" tiledversion="1.10.2" orientation="orthogonal" renderorder="right-down" width="`+map_size[0]+`" height="`+map_size[1]+`" tilewidth="32" tileheight="32" infinite="0" nextlayerid="3" nextobjectid="1">
 `+tileset+layer_txt+`
</map>
`
	fs.writeFile(filename, content, (err) => {
		if (err) {
			console.error('Si è verificato un errore durante la creazione del file:', err);
			return;
			}
	});
}

function create_matrix(r, c, val) {
	var matrix = [];
	for (var i = 0; i < c; i++) {
			var row = [];
			for (var j = 0; j < r; j++) {
				row.push(val);
			}
			matrix.push(row);
	}
	return matrix;
}

function createStreets(matrix, subdivide) {
	var y = matrix.length;
	var x = matrix[0].length;

	var blockr = Math.floor(matrix.length / subdivide);
	var blockc = Math.floor(matrix[0].length / subdivide);
	let points = [];
	for(let i = 0; i < matrix.length; i += blockr){
		var row = [];
		for(let j = 0; j < matrix[0].length; j += blockc){
			for(let z = 0; z < 100; z++){
				let point = {
					x: Math.floor(Math.random() * blockc) + j,
					y: Math.floor(Math.random() * blockr) + i
				};
				if(typeof matrix[point.y] !== "undefined" && matrix[point.y][point.x] != "undefined" && matrix[point.y][point.x] == "l"){
					row.push(point);
					break;
				}
			}
		}
		points.push(row);
	}

	//Disegna i punti nella matrice (città)
	for (let i = 0; i < points.length; i++) {
		for (let j = 0; j < points[0].length; j++) {
			if(typeof points[i][j] !== "undefined"){
				matrix[points[i][j].y][points[i][j].x] = 'c';
			}
		}
	}

	// Disegna le linee (strade)
	for (let i = 0; i < points.length; i++) {
		for (let j = 0; j < points[0].length; j++) {
			if(typeof points[i][j] === "undefined")
				continue;

			var connect = [[i,j+1], [i,j-1],[i+1,j], [i-1,j]];
			for (let c = 0; c < connect.length; c++) {
				if(typeof points[connect[c][0]] === "undefined" || typeof points[connect[c][0]][connect[c][1]] === "undefined")
					continue;

				let startX = points[i][j].x;
				let startY = points[i][j].y
				let endX = points[connect[c][0]][connect[c][1]].x;
				let endY = points[connect[c][0]][connect[c][1]].y;
				let dx = Math.abs(endX - startX);
				let dy = Math.abs(endY - startY);
				let sx = startX < endX ? 1 : -1;
				let sy = startY < endY ? 1 : -1;
				let err = dx - dy;

				//console.log(startX,",",startY," > ",endX,",",endY)

				while (true) {
					if (matrix[startY][startX] !== 'c') {
						matrix[startY][startX] = 's';
					}
					if (startX === endX && startY === endY) break;
					let e2 = 2 * err;
					if (e2 > -dy) {
						err -= dy;
						startX += sx;
					}
					if (e2 < dx) {
						err += dx;
						startY += sy;
					}
				}
			}
		}
	}

	return matrix;
}

//cerca una sottomatrice (submatrixToFind) in reference_matrix e sostituisce matrix con replacementMatrix
function searchAndReplace(matrix, reference_matrix, probability, submatrixToFind, replacementMatrix, replace_if0) {
	var replace = false;
	for (let r = 0; r < matrix.length; r++) {
		for (let c = 0; c < matrix[0].length; c++) {
			var count = 0;
			for (let sr = 0; sr < submatrixToFind.length; sr++) {
				for (let sc = 0; sc < submatrixToFind[0].length; sc++) {
					try{
						matrix[r+sr][c+sc]
					} catch(e){
						return [replace, matrix];
					}

					if(
						(
							reference_matrix[r+sr][c+sc] == submatrixToFind[sr][sc] || 
							submatrixToFind[sr][sc] == "*" || 
							(
								submatrixToFind[sr][sc] == "!" && 
								reference_matrix[r+sr][c+sc] != "w" && 
								reference_matrix[r+sr][c+sc] != "l"
							)
						) && 
						(
							matrix[r+sr][c+sc] == 0 || 
							replace_if0
						)
					){
						count++;
						if(count == submatrixToFind.length * submatrixToFind[0].length && Math.random() < probability){
							var randomIndex = Math.floor(Math.random() * replacementMatrix.length);
							for (let sr = 0; sr < submatrixToFind.length; sr++) {
								for (let sc = 0; sc < submatrixToFind[0].length; sc++) {
									if(submatrixToFind[sr][sc] != "*" && submatrixToFind[sr][sc] != "!"){
										matrix[r+sr][c+sc] = replacementMatrix[randomIndex][sr][sc];
										replace = true;
									}
								}
							}
							break;
						}
					} else {
						break;
					}
				}
			}
		}
	}
	return [replace, matrix];
}

function countCells(matrix, x) {
	let result = [];
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			if (matrix[i][j] === "l") { // Solo se il valore è zero
				let zeroesAround = 0;
				let add_empty = [];

				// Controllo sopra
				if (i > 0 && matrix[i - 1][j] === "w" ){
					zeroesAround++;
					add_empty.push([i - 1,j]);
				}
				// Controllo sotto
				if (i < matrix.length - 1 && matrix[i + 1][j] === "w"){
					zeroesAround++;
					add_empty.push([i + 1,j]);
				}
				// Controllo a sinistra
				if (j > 0 && matrix[i][j - 1] === "w"){
					zeroesAround++;
					add_empty.push([i,j - 1]);
				}
				// Controllo a destra
				if (j < matrix[i].length - 1 && matrix[i][j + 1] === "w"){
					zeroesAround++;
					add_empty.push([i,j + 1]);
				}

				if (zeroesAround >= x) {
					result = result.concat(add_empty);
				}
			}
		}
	}

	if(result.length == 0)
		return false;

	return result[Math.floor(Math.random() * result.length-1)];
}

function createBlotchMatrix(width, height, zerosCount) {
	zerosCount = width * height * zerosCount;
	//console.log(zerosCount);

	// Inizializza una matrice riempita con 2 (rappresenta le aree al di fuori della macchia)
	let matrix = Array(height)
		.fill()
		.map(() => Array(width).fill("w"));

	let startX = Math.floor(width/2);
	let startY = Math.floor(height/2);

	// Funzione per verificare se un punto è all'interno dei limiti della matrice
	function isValidPoint(x, y) {
		return x >= 0 && x < width && y >= 0 && y < height;
	}

	// Funzione per contare gli zeri nella matrice
	function countZeros(matrix) {
		let count = 0;
		matrix.forEach(row => {
			row.forEach(cell => {
				if (cell === "l") {
					count++;
				}
			});
		});
		return count;
	}

	var x = startX;
	var y = startY;
	while(1){
		if(!isValidPoint(x, y)){
			x = startX;
			y = startY;
		}

		island = countCells(matrix, 1)
		if(island){
			x = island[1];
			y = island[0];
		}
		var count_z = countZeros(matrix);
		if(count_z % 100 == 0)
			console.log((count_z/zerosCount)*100,"%");
		if (countZeros(matrix) === zerosCount){
			break
		}

		var rnd = Math.random()
		if (Math.random() < 0.5)
			matrix[y][x] = "l";
		
		//console.log(rnd);
		if(rnd <= 0.25)
			x--;
		else if(rnd > 0.25 && rnd <= 0.50)
			x++;
		else if(rnd > 0.50 && rnd <= 0.75)
			y--;
		else
			y++;
	}

	return matrix;
}

function stringToMatrix(str) {
	const matrix = [];
	let index = 0;

	if(str.indexOf(",") != -1)
		str = str.split(",");

	for (let i = 0; i < 3; i++) {
		const row = [];
		for (let j = 0; j < 3; j++) {
			row.push(str[index]);
			index++;
		}
		matrix.push(row);
	}

	return matrix;
}

function addBorder(matrix, thickness) {
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			// Sostituisci se l'elemento è nelle prime 'thickness' righe o colonne
			if (i < thickness || i >= matrix.length - thickness || j < thickness || j >= matrix[i].length - thickness) {
				matrix[i][j] = 'w';
			}
		}
	}
	return matrix;
}

var map = createBlotchMatrix(map_size[0], map_size[1], 0.5);
map = addBorder(map, 2);

var	map1 = JSON.parse(JSON.stringify(map));
for(var i = 0; i < map1.length; i++){
	for(var j = 0; j < map1[0].length; j++){
		if(map1[i][j] === "w")
			map1[i][j] = "."
		if(map1[i][j] === "l")
			map1[i][j] = "l"
	}	
}

//console.log(map1.map(row => row.join(' ')).join('\n'));

//sono stringhe di 9 caratteri che rappresentano le 9 celle di una matrice 3x3
//l = land, w = water, * = qualsiasi tipo, ! = tutti i tipi tranne w e l (quindi ad esempio un tile di angolo acqua come "ll*lw****")
replaceList = [
	["*l*lwl*l*", "l"],
	["*ll*wl*ll", "l"],
	["ll*lw*ll*", "l"],
	["*l*lwl***", "l"],
	["***lwl*l*", "l"],
	["*l**w**l*", "l"],
	["***lwl***", "l"],
	["*w**l**w*", "w"],
	["***wlw***", "w"],
	["lw*llwww*", "w"],
	["ww*llwlw*", "w"],
	["*wlwll*ww", "w"],
	["*wwwll*wl", "w"],
	["lw*llw***", "w"],
	["*wlwll***", "w"],
	["ll*lw****"], //tl
	["*ll*wl***"], //tr
	["lw*ll****"], //bl
	["*wl*ll***"], //br
	["*l**w****"], //t
	["*w**l****"], //b
	["****wl***"], //r
	["***lw****"], //l
	["***!w*l!*"], //corner tr
	["****w!*!l"], //corner tl
	["*!l*w!***"], //corner bl
	["l!*!w****"], //corner br
]

var countReplace = 0;
while(countReplace < replaceList.length -1){
	countReplace = 0;
	for(let i = 0; i < replaceList.length; i++){
		replaceMatrix = stringToMatrix(replaceList[i][0]);
		
		if(typeof replaceList[i][1] === "undefined")
			replaceMatrix[1][1] = replaceList[i][0];
		else
			replaceMatrix[1][1] = replaceList[i][1];

		var sar = searchAndReplace(map, map, 1, stringToMatrix(replaceList[i][0]), [replaceMatrix], true);
		map = sar[1];
		if(sar[1])
			countReplace++;
	}
}
//console.log("Replace done")

map = createStreets(map, 2.5);

//console.log(map.map(row => row.join(' ')).join('\n'));

for(let t = 0; t < settings.length; t++){
	//console.log(t,"/",settings.length);
	for(let o = 0; o < settings[t]["objects"].length; o++){
		//console.log(o,"/",settings[t]["objects"].length, settings[t]["name"]);
		var layer = settings[t]["objects"][o]["layer"];
		if (!Array.isArray(tiles[layer]))
			tiles[layer] = create_matrix(map_size[0], map_size[1], 0);
		if (!Array.isArray(tiles[layer + 1])) 
			tiles[layer + 1] = create_matrix(map_size[0], map_size[1], 0);

		var objects = settings[t]["objects"][o]["tiles"];
		for(var z = 0; z < objects.length; z++)
			objects[z] = objects[z].map(row => row.map(element => element + firstgid));

		var search_matrix = create_matrix(objects[0][0].length, objects[0].length, settings[t]["objects"][o]["type"]);
		sar = searchAndReplace(tiles[layer], map, settings[t]["objects"][o]["probability"],
			search_matrix, 
			objects,
			false
		);
		tiles[layer] = sar[1];
	}
	firstgid +=	settings[t]["tilecount"];
}

//senza questo i bordi dell'isola sono grigi visti da vicino
tiles[0] = searchAndReplace(tiles[0], tiles[0], 1,
	[[0]], 
	[[[1]]]
)[1];

mapGen("map.tmx", tiles);