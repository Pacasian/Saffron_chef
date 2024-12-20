const express = require("express")
const morgon = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");





const app = express()

require("dotenv/config");
const api = process.env.API_URL;
app.use(morgon("tiny"));
app.use(cors());


// Express v4.16.0 and higher
// --------------------------
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// For Express version less than 4.16.0
// ------------------------------------
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);



app.listen(3000, () => {
    console.log(api);
 
    console.log("Server running on port 3000, http://localhost:3000/",{
        promiseLibrary: global.Promise 
    });
});

// const uri = 'mongodb+srv://thimusrumak:pLyfafvgHge8WZPn@cluster0.mongodb.net/saffron1db?retryWrites=true&w=majority';
const uri = "mongodb+srv://thimusrumak:pLyfafvgHge8WZPn@saffroncluster.hkoli.mongodb.net/?retryWrites=true&w=majority&appName=SaffronCluster";
// mongoose.connect("mongodb://127.0.0.1:27017/version1")
mongoose.connect(uri)
.then(()=>{
    console.log("DB connected")
})
.catch((error)=>{
    console.error("Failed to load the server",error.message)
})

mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err);
  });
  
  mongoose.connection.once('open', () => {
    console.log('Database connected successfully!');
  });
const sellerUserRouter = require("./router/sellerUserRouter");

app.use(`${api}/newuser`,sellerUserRouter);


const dishRoute = require("./router/disheRouter");

app.use(`${api}/dish`,dishRoute);



const orderRoute = require("./router/orderRouter");

app.use(`${api}/order`,orderRoute);

app.get('/api/hello', (req, res) => {
    try {
        res.send('Hello World');
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).send('Internal Server Error');
    }
});


// // Creating a database schema/structure for the Seller Users
// const inventorySchema = new mongoose.Schema({
//     userID: {
//         type: String,
//         required: true // Ensures that the requested user ID is provided
//       },
//       item: {
//         type: String,
//         required: true // Ensures that the item name is provided
//       },
//       dt: {
//         type: Date,
//         default: Date.now // Automatically sets the date and time if not provided
//       },
//       amount: {
//         type: Number,
//         required: true, // Ensures the request amount is provided
//         min: 0 // Ensures that the amount is non-negative
//       },
//       stock: {
//         type: Boolean,
//         required: true // Indicates if the item is in stock (true or false)
//       },
//       rqt: {
//         type: Number,
//         required: true,
//         enum: [0, 1] // Restricts the value to either 0 or 1
//       },
//       note: {
//         type: String,
//         default: "" // Optional field for any additional notes
//       }
// });

{/* <script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCC682TMXCiD9fjjaOTxeCu0dOvm_FFxWg",
    authDomain: "saffronuser2024.firebaseapp.com",
    projectId: "saffronuser2024",
    storageBucket: "saffronuser2024.firebasestorage.app",
    messagingSenderId: "741729032650",
    appId: "1:741729032650:web:bda5cce2b02472e9af1733",
    measurementId: "G-N7EH5BHFTV"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);¸
</script> */}