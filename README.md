<h1 align="center">🧙‍♂️ Sending HTTP Requests 🧙‍♂️</h1>

## Initial Fetch Approach
```javascript
useEffect(() => {
  fetch("http://localhost:3000/places")
    .then((response) => response.json())
    .then((responseData) => setAvailablePlaces(responseData.places));
}, []);
```
- Basic fetch nested with .then() callbacks.
- This approach works but can become hard to read and maintain.

## Improved: Using async/await and Loading State
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
- Replaced .then() with an async function for better readability.
- Added a loading state (isFetchingData) to show feedback to the user while fetching.

> [!NOTE]
> An async function declaration creates an AsyncFunction object.
> Each time when an async function is called, it returns a new <code>Promise</code> which <strong>will be resolved</strong> with the value returned by the async function, or rejected with an exception uncaught within the async function.


<p align="center">🐸 This project is a practice exercise I learned from the <a href='https://www.udemy.com/course/react-the-complete-guide-incl-redux/?couponCode=ST7MT110524'>Academind's React Course</a> 🐸</p>
