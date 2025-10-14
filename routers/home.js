const path = require('path');
const express = require('express');
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
    res.render('index', {pageTitle : "Home Page"});
})

homeRouter.get("/contacts", (req, res) => {
    // res.render('contact', { pageTitle: "Contact Page" });
    console.log("contact page", req.url, req.method);
})

homeRouter.get("/services", (req, res) => {
    // res.render('services', { pageTitle: "Service Page" });
    console.log("service page", req.url, req.method);
})

homeRouter.get("/aboutUs", (req, res) => {
    // res.render('aboutUs', { pageTitle: "About Us Page" });
    console.log("about us page", req.url, req.method);
})

exports.homeRouter = homeRouter;