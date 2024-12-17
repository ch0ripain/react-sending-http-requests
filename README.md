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


<p align="center">🐸 This project is a practice exercise I learned from the <a href='https://www.udemy.com/course/react-the-complete-guide-incl-redux/?couponCode=ST7MT110524'>Academind's React Course</a> 🐸</p>
