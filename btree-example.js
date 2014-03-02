function Node(value, left, right){
	this.value = value;
	this.left = left;
	this.right = right;
}

Node.build = function(type, params){
	if(typeof Node[type] == 'function'){
		return new Node[type](params);
	}
}

Node.prototype.insert = function(node){
	if(node.value < this.value) {
		if(this.left == null) {
			this.left = node;
		} else {
			this.left.insert(node);
		}
	} else if(node.value > this.value) {
		if(this.right == null) {
			this.right = node;
		} else {
			this.right.insert(node);
		}
	}
}

Node.prototype.findNode = function(value) {
	var currentValue;
	if(this == null) return null;
	currentValue = this.value;
	if(currentValue == value) {
		return this;
	} else if(currentValue < value) {
		return this.right.findNode(value);
	} else if(currentValue > value) {
		return this.left.findNode(value);
	}
};

Node.findNode = function(root, value){
	return root.findNode(value);
}

Node.buildTree = function(data){
	var current_node, root, i;
	
	for(i = 0; i < data.length; i++){
		current_node = Node.build(data[i].type, data[i]['values']);
		if(root == undefined){
			root = current_node;
		}else{
			root.insert(current_node);
		}
	}
	return root;
}

//function Medicine(timestamp, name){
Node.Medicine = function(params){
	Node.call(this, params.timestamp);
	this.name = params.name;
}

Node.Medicine.prototype = Object.create(Node.prototype, {
	constructor : {
		configurable : true,
		enumerable : true,
		value : Node.Medicine,
		writable : true
	}
});

//function MeterReading(timestamp, blood_glucose) {
Node.MeterReading = function(params) {
	Node.call(this, params.timestamp);
	this.blood_glucose = params.blood_glucose;
}

Node.MeterReading.prototype = Object.create(Node.prototype, {
	constructor : {
		configurable : true,
		enumerable : true,
		value : Node.MeterReading,
		writable : true
	}
});


function test() {
	var root;
	var data = [{type: 'MeterReading', values: {timestamp: 123, blood_glucose: 150}},
				{type: 'MeterReading', values: {timestamp: 321, blood_glucose: 250}},
				{type: 'MeterReading', values: {timestamp: 125, blood_glucose: 350}},
				{type: 'Medicine', values: {timestamp: 111, name: 'Insulin'}},
				{type: 'Medicine', values: {timestamp: 322, name: 'Coffee'}},
				{type: 'Medicine', values: {timestamp: 113, name: 'Pill'}}];
	root = Node.buildTree(data);
	console.log("test:: " + Node.findNode(root,322).name);
}

test();