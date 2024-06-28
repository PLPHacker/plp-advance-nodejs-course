const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

// Read data from JSON file
function readData() {
  const dataPath = path.join(__dirname, 'data.json');
  if (!fs.existsSync(dataPath)) {
    return {};
  }
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

// Write data to JSON file
function writeData(data) {
  const dataPath = path.join(__dirname, 'data.json');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// Endpoint to retrieve data
function getData(req, res) {
  const data = readData();
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

// Endpoint to store data
// Endpoint to store data
// Endpoint to store data
function storeData(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const formData = querystring.parse(body);
    console.log('Parsed form data:', formData); // Log parsed form data
    try {
      const message = formData.message;
      const data = readData();
      // Append the new message to the existing data
      data.message = message;
      writeData(data);
      res.end(JSON.stringify({ message: 'Data updated successfully' }));
    } catch (error) {
      console.error('Error:', error);
      res.statusCode = 400;
      res.end('Invalid form data');
    }
  });
}



// Create HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/data') {
    getData(req, res);
  } else if (req.method === 'POST' && req.url === '/data') {
    storeData(req, res);
  } else if (req.method === 'GET' && req.url === '/') {
    // Handle requests to the root URL
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h1>Welcome to Node.js App</h1>
      <p>Enter a message:</p>
      <form action="/data" method="POST">
        <input type="text" name="message">
        <button type="submit">Submit</button>
      </form>
    `);
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
