const express = require('express');
const staffRouter = express.Router();

staffRouter.get("/addStaff", (req, res) => {
    res.render('addStaff', { pageTitle: "Add Staff" });
})

staffRouter.post("/addStaff", (req ,res) => {
    // 
})

exports.staffRouter = staffRouter;