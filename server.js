import express from 'express';

const app = express();

//Set static folder
app.use(express.static('public'));

// parse URL-econded bodies
app.use(express.urlencoded({extended: true}));

//parse JSON bodies
app.use(express.json());


// HANDLE GET request to fecth users

// Handle GET request to fetch users
app.get('/users', async (req, res) => {
    // const users = [
    //   { id: 1, name: 'John Doe' },
    //   { id: 2, name: 'Bob Williams' },
    //   { id: 3, name: 'Shannon Jackson' },
    // ];
  
    setTimeout(async () => {
      const limit = +req.query.limit || 10;
  
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
      );
      const users = await response.json();
  
      res.send(`
      <h1 class="text-2xl font-bold my-4">Users</h1>
      <ul>
        ${users.map((user) => `<li>${user.name}</li>`).join('')}
      </ul>
    `);
    }, 2000);
  });

// Handle POST request for temp conversion
app.post('/convert', (req, res) => {
    setTimeout(() => {
      const fahrenheit = parseFloat(req.body.fahrenheit);
      const celsius = Math.round((fahrenheit - 32) * (5 / 9));
  
      res.send(`
        <p>
          ${fahrenheit} degrees Farenheit is equal to ${celsius} degrees Celsius
        </p>
      `);
    }, 2000);
  });
  
  let counter = 0;

  // Handle GET request for polling example
app.get('/poll', (req, res) => {
    counter++;
  
    const data = { Temp: counter };
  
    res.json(data);
  });
  
  let currentTemperature = 20;

// Handle GET request for weather
app.get('/get-temperature', (req, res) => {
    currentTemperature += Math.random() * 2 - 1; // Random temp change
    res.send(currentTemperature.toFixed(1) + '°C');
  });

//start the server

app.listen(3000,()=>{
    console.log("Server Running on port 3000")
})
