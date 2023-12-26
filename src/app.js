import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//<<<<<<<<<<<<<<<------------------ MIDDLE-WARES------------------->>>>>>>>>>>>>

/* APP.USE : - use for midlle ware that is use in the middle of app resposnse and reject*/
/* CORS : - cors use for corss origin resource shareing matlab ham kisi bhi url ko permission nahi dete hai to access the 
the data in are database jo bhi cors ke origin me url set hai bo hi kebal request kar sakte hai to give and used data  */
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

/* DATA :- toh data kai tarah se recive hota hai backend ko like json format body format file format url format and etc
tho  kitna aur kaise data aata hai use permission deni hoti hai backend. */
/* EXPRESS.JSON : - THIS MIDDLEWARE USE TO PERMISSION KI APP JSON DATA BHEJ SAKTE HAI */
app.use(express.json({limit:"20kb"}));

/* NOTE :-  SO PHELE BODY DATA KO ACCEPT KARNE KE LIYE BODY PARSER USE HOTA THA BUT DUE TO EVAUATION YE AB DIRECT HO JATA HAI SO WE NOT WARRY ABOUT TAHT
TAHT THE INFO ABOUT THE BODY DATA 
*/
/*EXPRESS.URLENCODED :- THAT IS SIMPLEY USE TO ACCEPT THE DATA THAT GIVEN BY THE URL LIKE ?,QUERY AND ETC...*/
app.use(express.urlencoded({
    extended: true,
    limit: "20kb"
}));


/*
EXPRESS.STATIC :- WHEN WE WANT TO STORE PDF, IMAGE,FAVICON  NESSORY IMAGE JO HAMARE SERVER SE HI UPLOAD HO UNHE HI ACCESS DENE KE LIYE HAM
ISS MIDDLEWARE KA ISTMAL KARTE HAI */
app.use(express.static("public"));

/* EXPRESS.COOKIEPARSER :- THAT IS USE TO DO CRUD OPRATION ON COOKIES */
app.use(cookieParser());


export {app}