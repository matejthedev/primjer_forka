var express=require('express');
var app=express();
var exec=require('child_process').exec;

var config=require('./config.json');

app.use(express.bodyParser());

for( i in config.gits ){
	app.all('/'+config.gits[i].name,function(req,res){
		exec('git pull origin '+config.gits[i].branch, {cwd: config.gits[i].dir}, function(error, stdout, stderr){
			console.log( {error: error, stdout: stdout, stderr: stderr } );
		});
		res.send("pikachu");
	});
};

app.all('*',function(req,res){
	res.send('pi pikachu');
});

app.listen(config.port);
