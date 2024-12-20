// express
// Router
// import model

const express = require("express");
const dishModel = require("../models/dishModel");
const route = express.Router();



// GET all the data from the db

route.get('/',async (req,res)=>{

    try {
        const allDish = await dishModel.find();

        res.status(200).json(allDish);

    } catch (error) {
        

        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
});


// POST route to save a new dish
route.post('/addDish', async (req, res) => {
    try {
      // Create a new instance of the Dish model with the data from the request body
      const newDish = new dishModel({
        name: req.body.Name,
        itemID: req.body.itemID,
        dat: req.body.DAT || Date.now(),  // Use provided date or current date if not provided
        quantity: req.body.Quantity,
        price: req.body.Price,
        offer: req.body.Offer || false,
        discnt: req.body.Discnt || 0,
        calories: req.body.Calories,
        image: req.body.Image,
        category: req.body.Category,
        stock: req.body.Stock || true,
      });
  
      // Save the dish to the database
      const savedDish = await newDish.save();
  
      // Respond with the saved dish data
      res.status(201).json({
        message: 'Dish added successfully',
        data: savedDish,
      });
    } catch (error) {
      // Handle errors and respond with an error message
      res.status(500).json({
        message: 'Failed to add dish',
        error: error.message,
      });
    }
  });


// POST method to save bulk menu data into the database
// route.post('/menu', async (req, res) => {
//     try {
//       const menuData = req.body; // Expecting the JSON array format as in previous messages
//
//       // Flatten the data into an array of individual dish items with categories
//       const dishes = menuData.flatMap(categoryData =>
//         categoryData.items.map(item => ({
//           ...item,
//           Category: categoryData.category // Add category from the outer structure to each item
//         }))
//       );
//
//       // Save the array of dishes to the database in bulk
//       await dishModel.insertMany(dishes);
//
//       res.status(201).json({ message: "Menu items have been successfully saved!" });
//     } catch (error) {
//       console.error("Error saving menu items:", error);
//       res.status(500).json({ message: "Failed to save menu items", error: error.message });
//     }
//   });

route.post('/menu', async (req, res) => {
    try {
        const menuData = req.body; // Expecting the JSON array format as in previous messages

        // Flatten the data into an array of individual dish items with categories
        const dishes = menuData.flatMap(categoryData =>
            categoryData.items.map(item => ({
                ...item,
                category: categoryData.category // Add category from the outer structure to each item
            }))
        );

        // Save the array of dishes to the database in bulk
        await dishModel.insertMany(dishes);

        res.status(201).json({ message: "Menu items have been successfully saved!" });
    } catch (error) {
        console.error("Error saving menu items:", error);
        res.status(500).json({ message: "Failed to save menu items", error: error.message });
    }
});



  // PUT route to update a dish by its _id
route.put('/updateDish/:id', async (req, res) => {
    try {
        const dishId = req.params.id; // Extract _id from request parameters
        const updateData = req.body; // Data to update

        // Find the document by _id and update it
        const updatedDish = await dishModel.findByIdAndUpdate(
            dishId,        // The _id of the document
            updateData,    // Data to update
            { new: true, runValidators: true }  // Return the updated document instead of the original
        );

        // If the document is not found
        if (!updatedDish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        // Respond with the updated document
        res.status(200).json({
            message: "Dish updated successfully",
            data: updatedDish,
        });
    } catch (error) {
        // Handle errors and respond with an error message
        res.status(500).json({
            message: "Failed to update dish",
            error: error.message,
        });
    }
});

  module.exports = route;





