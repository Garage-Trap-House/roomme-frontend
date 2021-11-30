const express = require('express')
const cors = require('cors')
const app = express()

//https://stackoverflow.com/questions/47876754/query-firestore-database-for-document-id

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
const { snapshotConstructor } = require('firebase-functions/v1/firestore')
const { DataSnapshot } = require('firebase-functions/v1/database')

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
  const useruid = req.body.userid;
  var account = {
    "Email": JSON.stringify(email),
    "Password": JSON.stringify(password)
  } 

  db.collection('testingusers').doc(useruid).set(account)

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

      const todoListName = "todolist - " + emailAddress
      console.log(todoListName)
      const todoList = {
        [todoListName] : [emailAddress]
      }
      db.collection('testingtodo').doc(housename).set(todoList)


    } else {
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

})


// app.post('/addHousemates' , (req, res) => {
//   const useruid = req.body.useruid
//   const housename = req.body.housename
//   const newEmail = req.body.newEmail

//   const docRef = db.collection('testingusers').doc(useruid)

//   docRef.get().then(function(doc) {
//     if (doc.exists) {
//       const docRef = db.collection('testinghouses').doc(housename)
//       docRef.update({
//         housemates: FieldValue.arrayUnion(newEmail)
//       });      

//     } else {
//       console.log("error try again")
//     }
//   }).catch(function(error) {
//     console.log("Error getting document:", error);
//   });

// })

app.post('/getChores' , (req, res) => {
  const housename = req.body.housename
  const name = req.body.name
  
  const docRef = db.collection('testingtodo').doc(housename).collection(name).doc('todolist')

  docRef.get().then(function(doc) {
    if (doc.exists) {
      var data = doc.data()
      console.log(data.chores)
      res.send(data.chores)

    } else {
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });


  /////////////////////////////////////////////////

  // const docRef = db.collection('testingtodo').doc(housename)
  // docRef.get().then(function(doc) {
  //   if (doc.exists) {
  //     var data = doc.data();
  //     const blah = "todolist - " + "11@gmail.com" 
  //     //console.log(blah)
  //     const chore = data.blah
  //     //console.log(chore)
  //     console.log(data)

  //     res.send(data)

  //   } else {
  //     console.log("No such document!");
  //   }
  // }).catch(function(error) {
  //   console.log("Error getting document:", error);
  // });

  //////////////////////////////////////////////////////

  // var subcollection = []
  // var hi = []
  // const houseRef = db.collection('testinghouses').doc(housename)
  // houseRef.get().then(function(doc) {
  //   if (doc.exists) {
  //     var data = doc.data();
  //     housematesName = data.housemates
  //     amtOfhousemates = housematesName.length
  //     //console.log(amtOfhousemates)

  //     const docRef = db.collection('testingtodo').doc(housename)
  //     docRef.listCollections().then(collections => {
  //       //for (let collection of collections) {
          
  //         for (let i = 0; i < amtOfhousemates; i++){
  //           //console.log(`Found collection with id: ${collections[i].id}`);
  //           subcollection[i] = collections[i].id


            

  //           const name = db.collection('testingtodo').doc(housename).collection(subcollection[i]).doc('todolist')

  //             name.get().then(function (doc) {
  //               if (doc.exists) {
  //                 var data = doc.data();

  //                 //hi[i] = subcollection[i] + " " + data.chores

  //                 const hu = {
  //                   [subcollection[i]]: [data.chores]
  //                 }

  //                 const j = [subcollection[i], data.chores]


                 
  //                 // if (subcollection[i] = amtOfhousemates){
  //                 //   res.send(hu)
  //                 // }

  //               } else {
  //                 console.log("No such document!");
  //               }
                
  //               //res.send(hi)
  //             }).catch(function (error) {
  //               console.log("Error getting document:", error);
  //             })
  //         }
  //     });

  //   } else {
  //     console.log("No such document!");
  //   }
  // }).catch(function(error) {
  //   console.log("Error getting document:", error);
  // });
})

app.post('/addChores' , (req, res) => {
  const housename = req.body.housename
  const task = req.body.task
  const assignedTo = req.body.assignedTo

  const docRef = db.collection('testingtodo').doc(housename).collection(assignedTo).doc('todolist')

  docRef.update({
    chores: FieldValue.arrayUnion(task)
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
