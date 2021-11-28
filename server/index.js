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

app.post('/todo', (req, res) =>{
  const todo = req.body.todo

  var to = {
    "action": JSON.stringify(todo)
  }
  console.log(todo)
  return db.collection('cities').doc('LA1').set(to);
})


app.post('/createAccount' , (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userid = req.body.userid;
  var account = {
    "Email": JSON.stringify(email),
    "Password": JSON.stringify(password)
}

  //console.log(password, email);
  return db.collection('testingusers').doc(userid).set(account)

})

app.post('/getName' , (req, res) => {
  const useruid = req.body.useruid

  const docRef = db.collection('testingusers').doc(useruid)

  docRef.get().then(function(doc) {
    if (doc.exists) {
      var data = doc.data();

      emailAddress = data.Email
      
      console.log(emailAddress)

      res.send(emailAddress)

    } else {
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
})

app.post('/checkHouses', (req, res) => {
  const useruid = req.body.useruid;

  //console.log(userid)
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

      // const houseRef = db.doc(house)
      

      // houseRef.get().then(function(doc1){
      //   if(doc1.exists){
      //     var data = doc1.data();
      //     //console.log(data.housemate1)
      //   }
      // }).catch(function(error) {
      // console.log("Error getting document:", error);
      // });

      // Attach an asynchronous callback to read the data at our posts reference
      // ref.on('value', (snapshot) => {
      //   console.log(snapshot.val());
      // }, (errorObject) => {
      //   console.log('The read failed: ' + errorObject.name);
      // }); 

    } else {
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

})

app.post('/getHousemates', (req, res) => {
  const housename = req.body.housename;

  //console.log(userid)
  const docRef = db.collection('testinghouses').doc(housename);

  docRef.get().then(function(doc) {
    if (doc.exists) {
      var data = doc.data();

      housematesName = data.housemates
      
      //console.log(data.housemates)

      res.send(housematesName)

      // const houseRef = db.doc(house)
      

      // houseRef.get().then(function(doc1){
      //   if(doc1.exists){
      //     var data = doc1.data();
      //     //console.log(data.housemate1)
      //   }
      // }).catch(function(error) {
      // console.log("Error getting document:", error);
      // });

      // Attach an asynchronous callback to read the data at our posts reference
      // ref.on('value', (snapshot) => {
      //   console.log(snapshot.val());
      // }, (errorObject) => {
      //   console.log('The read failed: ' + errorObject.name);
      // }); 

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
