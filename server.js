var ip;
var port = 8000;
var key = 'qwert';
var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs')

app.listen(port);

! function() {
  var os = require('os')
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (k in interfaces) {
    for (k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family == 'IPv4' && !address.internal) {
        addresses.push(address.address)
      }
    }
  }
  ip = addresses[0];
  console.log('Server running at http://' + addresses[0] + ':' + port + '/');
  console.log('Control device open http://' + addresses[0] + ':' + port + '/control.html?' + key);
}();

function returnStatic(path, res) {
  var reqKey;
  if(path.indexOf('?') > 0){
    var segs = path.split('?');
    path = segs[0];
    reqKey = segs[1];
  }
  if(path === '/control.html' && key != reqKey){
    res.writeHead(500);
    return res.end('Error loading index.html');
  }
  fs.readFile(__dirname + path,
    function(err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);

      if (path === '/control.html' || path === '/js/index.js') {
        return res.end(data.toString().replace(/\{\$ip\}/g, ip).replace(/\{\$port\}/g, port));
      }
      return res.end(data);
    });
}

function handler(req, res) {
  try {
    if (req.url === '/') {
      req.url = '/index.html';
    }
    var staticPath = ['/index.html', '/images', '/css', '/js', '/plugin', '/favicon.png', '/apple-touch-icon.png', '/control.html'];
    var catched = false;
    for (var i = 0; i < staticPath.length; i++) {
      var path = staticPath[i];
      if (req.url.indexOf(path) === 0) {
        catched = true;
        returnStatic(req.url, res);
      }
    }
    if (!catched) {
      res.writeHead(404);
      return res.end();
    }
  } catch (e) {
    res.writeHead(500);
    return res.end(e);
  }
}

io.sockets.on('connection', function(socket) {
  socket.on('control', function(data) {
    console.log(data);
    socket.broadcast.emit('control', data);
  });
});