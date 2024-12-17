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


<p align="center">🐸 This project is a practice exercise I learned from the <a href='https://www.udemy.com/course/react-the-complete-guide-incl-redux/?couponCode=ST7MT110524'>Academind's React Course</a> 🐸</p>
