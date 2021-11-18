//import { initializeApp } from 'firebase/app';
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const { initializeApp } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, function() {
  console.log('Server running at http://'+ hostname + ':' + port + '/');
});


const firebaseConfig = {
  apiKey: "AIzaSyC1u5LF8UdxWJEkFB1k4y4iA4Njv1c8yck",
  authDomain: "cs-4800-project.firebaseapp.com",
  databaseURL: "https://cs-4800-project-default-rtdb.firebaseio.com",
  projectId: "cs-4800-project",
  storageBucket: "cs-4800-project.appspot.com",
  messagingSenderId: "90582600538",
  appId: "1:90582600538:web:66fbed6394f54ce7848163",
  measurementId: "G-KZ94TTK7E9"
};

//const app = initializeApp(firebaseConfig);
//const db = getFirestore(app);


const functions = require('firebase-functions');
const serviceAccount = require('./ServiceAccountKey.json');
const admin = require('firebase-admin');
const { getQueriesForElement } = require('@testing-library/dom');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: "https://cs-4800-project-default.firebaseio.com"
});
const db = admin.firestore();

let data = {
  name: 'Los Angeles',
  state: 'CA',
  country: 'USA'
};

db.collection('cities').doc('LA').set(data);



// server.post('/createAccount' , (req, res) => {
//   const emailAddress = req.body.emailAddress;
//   const password = req.body.password;

//   db.collection('users').doc(emailAddress).add(emailAddress)

// })

