const express = require("express")
const router = express.Router();
const sellerUserData = require("../models/sellerUserModel")

    router.post("/",async (req,res)=>{

           
            const sellerUserDataList = new sellerUserData({
                dName:req.body.dName,
                dUser:req.body.dUser,
                dPassword:req.body.dPassword,
                status:req.body.status,
                dt: req.body.dt,
                dUsrCnt: req.body.dUsrCnt,
            });
            sellerUserDataList.save().then((create)=>{
                    console.log("created a new user");
                    res.status(200).json(create);
            }).catch((error)=>{
                res.status(500).json({
                    error:error,
                    success:false,
                });
                console.error("Failed 1",error.message)
            });
            console.log("New user added")
           
        }
    );

    router.get("/login", async (req, res) => {
        const { dUser, dPassword } = req.query;  // Assuming query parameters for GET request
    
        if (!dUser || !dPassword) {
            return res.status(400).json({
                success: false,
                message: "dUser and dPassword are required."
            });
        }
    
        try {
            // Find user by dUser (username)
            const sellerUserDataList = await sellerUserData.findOne({ dUser });
    
            if (!sellerUserDataList) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
    
            // Check if the password matches
            if (sellerUserDataList.dPassword !== dPassword) {
                return res.status(401).json({
                    success: false,
                    message: "Incorrect password"
                });
            }
    
            // If user found and password matches
            return res.status(200).json({
                success: true,
                message: "Login successful",
                user: sellerUserDataList
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "An error occurred while processing your request.",
                error: error.message
            });
        }
    });


    router.get("/",async(req,res)=>{
        try {
            const sellerUserDataList = await sellerUserData.find()
            res.status(200).json(sellerUserDataList);
        } catch (error) {
            res.status(500).json({
                success:false,
                error:error.message,
            })
        }
    })
    router.delete("/:dUser", async (req, res) => {
        try {
          const dUser = req.params.dUser;  // Extract the dUser from the URL params
      
          // Use findOneAndDelete to delete the document based on dUser
          const sellerUserDataList = await sellerUserData.findOneAndDelete({ dUser });
      
          if (!sellerUserDataList) {
            return res.status(404).json({
              success: false,
              message: "No user found"
            });
          }
      
          return res.status(200).json({
            success: true,
            message: "Deleted",
            data: sellerUserDataList
          });
      
        } catch (error) {
          return res.status(500).json({
            success: false,
            error: error.message
          });
        }
      });
module.exports= router;  
     


