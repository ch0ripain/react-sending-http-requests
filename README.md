<h1 align="center">🧙‍♂️ Sending HTTP Requests 🧙‍♂️</h1>

## 1. Initial Fetch Approach ⚙️
```javascript
useEffect(() => {
  fetch("http://localhost:3000/places")
    .then((response) => response.json())
    .then((responseData) => setAvailablePlaces(responseData.places));
}, []);
```
- Basic <code>fetch</code> nested with <code>.then()</code> callbacks.
- This approach works but can become hard to read and maintain.

## 2. Improved: Using <code>async/await</code> and Loading State 🚀
```javascript
const [availablePlaces, setAvailablePlaces] = useState([]);
const [isFetchingData, setIsFetchingData] = useState(false);

useEffect(() => {
  async function fetchPlaces() {
    setIsFetchingData(true);
    const response = await fetch("http://localhost:3000/places");
    const responseData = await response.json();
    setAvailablePlaces(responseData.places);
    setIsFetchingData(false);
  }
  fetchPlaces();
}, []);

```
- Replaced <code>.then()</code> with an <code>async function</code>.
- Added a loading state (<code>isFetchingData</code>) to show feedback to the user while fetching.

> [!NOTE]
> An async function declaration creates an <code>AsyncFunction</code> object.
> Each time when an async function is called, it returns a new <code>Promise</code> which <strong>will be resolved</strong> with the value returned by the async function, or rejected with an exception uncaught within the async function.

## 3. Error Handling with <code>try/catch</code> 🛡️
```javascript
const [availablePlaces, setAvailablePlaces] = useState([]);
const [isFetchingData, setIsFetchingData] = useState(false);
const [error, setError] = useState();

useEffect(() => {
  async function fetchPlaces() {
    try {
      setIsFetchingData(true);
      const response = await fetch("http://localhost:3000/places");
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Fetching data error :(");
      }

      setAvailablePlaces(responseData.places);
    } catch (error) {
      setError(
        error.message ||
          "Could not fetch the places data, please try again later."
      );
    }
    setIsFetchingData(false);
  }
  fetchPlaces();
}, []);

```
- Added error handling using a <code>try/catch</code> block.
- Included an error state to manage and display errors.

## 4. Final Optimization: Outsourcing HTTP Logic 🧰
Moved the HTTP request logic to a standalone utility function <code>http.js</code> for cleaner and more reusable code.
```javascript
export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error("Error fetching places data.");
  }
  return responseData.places;
}

//final example code
import { fetchAvailablePlaces } from "../http.js";

async function fetchPlaces() {
  try {
    setIsFetchingData(true);
    const places = await fetchAvailablePlaces();
    setAvailablePlaces(places);
  } catch (error) {
    setError(error.message || "Failed to fetch places.");
  }
  setIsFetchingData(false);
}
```

## Making HTTP Requests with Methods, Body, and Headers 🚀
By default, fetch uses the <code>GET method</code>. If you want to use a different <code>HTTP method</code>, you need to provide an options object with specific properties such as <code>method</code>, <code>body</code>, and <code>headers</code>.

This function sends an HTTP PUT request to update user places on the server.
```javascript
export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT", // Specify the HTTP method
    body: JSON.stringify({ places }), // Convert JS object to JSON format
    headers: {
      "Content-Type": "application/json", // Inform the server about the data type
    },
  });

  const responseData = await response.json(); // Parse the response body as JSON

  if (!response.ok) {
    throw new Error("Updating user places went wrong :("); // Handle errors
  }

  return responseData.message; // Return a success message
}
```

### Explanation of Key Concepts 🧰

Common HTTP Methods 🌐
 
<code>GET</code>  ➡️ Retrieve data from the server <br/>
<code>POST</code> ➡️ Send new data to the server <br/>
<code>PUT</code>  ➡️ Update existing data on the server <br/>
<code>DELETE</code> ➡️ Remove data from the server <br/>
<code>PATCH</code>  ➡️ Partially update data

<code>body: JSON.stringify({ places })</code>

- <code>JSON.stringify()</code> converts a JavaScript object into a JSON-formatted string because HTTP requests require plain text (not raw JS objects).
- You must pass an <code>object</code> with key-value pairs (e.g., { places: [...] }) so the server can properly identify and handle the data.

<code>headers: { "Content-Type": "application/json" }</code>

- The <code>headers</code> property defines additional information sent with the request.
- <code>Content-Type: application/json</code> tells the server that the body contains JSON-formatted data, ensuring it is parsed correctly.

<code>response.json()</code>

- The <code>.json()</code> method reads the server's response body and converts it into a JavaScript object.
- This is necessary because fetch returns a <code>stream</code> by default, and you need to "decode" it into usable data.

---


<p align="center">🐸 This project is a practice exercise I learned from the <a href='https://www.udemy.com/course/react-the-complete-guide-incl-redux/?couponCode=ST7MT110524'>Academind's React Course</a> 🐸</p>
