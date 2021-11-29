const express = require('express')
const cors = require('cors')
const app = express()

// https://abhik-b.medium.com/short-guide-to-firestore-reference-data-type-9c9197e4b9ee

app.use(cors({
  origin: '*'
}))

app.use(
  express.urlencoded({
    extended:true
  })
)

app.use(express.json())

const serviceAccount = require('./ServiceAccountKey.json');
const admin = require('firebase-admin');
const FieldValue = require('firebase-admin').firestore.FieldValue;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: "https://cs-4800-project-default.firebaseio.com"
});
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })


// const firebaseConfig1 = {
//   apiKey: "AIzaSyC1u5LF8UdxWJEkFB1k4y4iA4Njv1c8yck",
//   authDomain: "cs-4800-project.firebaseapp.com",
//   databaseURL: "https://cs-4800-project-default-rtdb.firebaseio.com",
//   projectId: "cs-4800-project",
//   storageBucket: "cs-4800-project.appspot.com",
//   messagingSenderId: "90582600538",
//   appId: "1:90582600538:web:66fbed6394f54ce7848163",
//   measurementId: "G-KZ94TTK7E9"
// };
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

app.post('/createAccount' , (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const useruid = req.body.useruid;
  var account = {
    "Email": JSON.stringify(email),
    "Password": JSON.stringify(password)
  } 

  return db.collection('testingusers').doc(useruid).set(account)

})

app.post('/getName' , (req, res) => {
  const useruid = req.body.useruid
  const docRef = db.collection('testingusers').doc(useruid)

  docRef.get().then(function(doc) {
    if (doc.exists) {
      var data = doc.data();
      emailAddress = data.Email

      res.send(emailAddress)

    } else {
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
})

app.post('/createHouse' , (req, res) => {
  const useruid = req.body.useruid
  const housename = req.body.housename

  const nameRef = db.collection('testingusers').doc(useruid)
  nameRef.get().then(function(doc) {
    if (doc.exists) {
      var data = doc.data();
      const emailAddress = data.Email

      const housemates = {
        housemates: [emailAddress]
      } 

      const newHouse = "/testinghouses/" + housename
      let houseRef = db.doc(newHouse)
      db.collection('testinghouses').doc(housename).set(housemates)

      const docRef = db.collection('testingusers').doc(useruid)
      docRef.update({
        houses: FieldValue.arrayUnion(houseRef)
      });


    } else {
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

})


app.post('/addHousemates' , (req, res) => {
  const useruid = req.body.useruid
  const housename = req.body.housename
  const newEmail = req.body.newEmail

  db.collection('testingusers').where('Email', '==', newEmail)

})

app.post('/getChores' , (req, res) => {
  const housename = req.body.housename

  const docRef = db.collection('testingtodo').doc(housename)
  docRef.get().then(function(doc) {
    if (doc.exists) {
      var data = doc.data();
      console.log(data)

    } else {
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
})

app.post('/checkHouses', (req, res) => {
  const useruid = req.body.useruid;

  const docRef = db.collection('testingusers').doc(useruid);

  docRef.get().then(function(doc) {
    if (doc.exists) {
      var data = doc.data();
      house = data.houses
      amtOfHouse = house.length
      var array = []

      for (let i = 0; i < amtOfHouse; i++){
        var bruh = []
        house[i] = house[i].path
        bruh[i] = house[i].toString()
        array[i] = bruh[i].substring(bruh[i].indexOf('/') + 1);

      }

      res.send(array)

    } else {
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

})

app.post('/getHousemates', (req, res) => {
  const housename = req.body.housename;
  const docRef = db.collection('testinghouses').doc(housename);

  docRef.get().then(function(doc) {
    if (doc.exists) {
      var data = doc.data();
      housematesName = data.housemates

      res.send(housematesName)

    } else {
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

})

const port = process.env.PORT || 3001;

app.listen(3001, () => {
	console.log("Server started at port 3001");
});
