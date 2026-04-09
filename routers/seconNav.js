const path = require('path');

const express = require('express');
const secondNav = express.Router();

secondNav.get("/dashboard", (req, res) => {
    console.log("route to dashboard", req.url, req.method);
})

secondNav.get("/adminLogin", (req, res) => {
    // res.sendFile(path.join(__dirname, '../', 'views', ''));
    console.log("route to dashboard", req.url, req.method);
})

secondNav.get("/patientDetailForm", (req, res) => {
    res.render('pateintDetail', {pageTitle : "Pateint Detail Form"});
})

secondNav.get("/pateintInfoPortal", (req, res) => {
    res.render('patientInfoPortal', { pageTitle: "Patient Info Access Portal" });
});

secondNav.get("/manageStaff&Accounts", (req, res) => {
    res.render('manageStaff&Accounts' , {pageTitle :"Manage Staff & Accounts"});
})

exports.secondNav = secondNav;
