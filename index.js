const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')

//https://stackoverflow.com/questions/47876754/query-firestore-database-for-document-id

// https://abhik-b.medium.com/short-guide-to-firestore-reference-data-type-9c9197e4b9ee

app.use(cors({
  origin: '/'
}))

app.use(express.static(path.join(__dirname + '/client/build')));

app.use(
  express.urlencoded({
    extended:true
  })
)

app.use(express.json())

app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "http://roomme-backend.uc.r.appspot.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

      // const todoListName = "todolist - " + emailAddress
      // console.log(todoListName)
      // const todoList = {
      //   [todoListName] : [emailAddress]
      // }
      // db.collection('testingtodo').doc(housename).set(todoList)

      const chore = {
        chores : ['check the todo list']
      }

      db.collection('testingtodo').doc(housename).collection(emailAddress).doc('todolist').set(chore)


    } else {
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

})


app.post('/addHousemates' , (req, res) => {
  const housename = req.body.housename
  const newEmail = req.body.newEmail

  var newHousemate

    db.collection('testingusers').get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach(doc => {
        var data = doc.data()

        const email = '"'+ newEmail+'"'
        console.log(data.Email)

        if (data.Email == email){
          newHousemate = doc.id
          // adds them to the house's housemate list
          const houseRef = db.collection('testinghouses').doc(housename)
          houseRef.update({
            housemates: FieldValue.arrayUnion(newEmail)
          });
          
          // adds them to the user's list of house references
          const newHouse = "/testinghouses/" + housename
          let houseName = db.doc(newHouse)
          const docRef = db.collection('testingusers').doc(newHousemate)
          docRef.update({
            houses: FieldValue.arrayUnion(houseName)
          });

          // adds them into the todo list for the house
          const chore = {
            chores : ['check the todo list']
          }    
          db.collection('testingtodo').doc(housename).collection(newEmail).doc('todolist').set(chore)


        }
      })
    });

})

app.post('/getChores' , (req, res) => {
  const housename = req.body.housename
  const name = req.body.name
  
  const docRef = db.collection('testingtodo').doc(housename).collection(name).doc('todolist')
  console.log(name)

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

app.post('/deleteChores' , (req, res) => {
  const housename = req.body.housename
  const task = req.body.task
  const assignedTo = req.body.assignedTo

  const docRef = db.collection('testingtodo').doc(housename).collection(assignedTo).doc('todolist')

  docRef.update({
    chores: FieldValue.arrayRemove(task)
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

app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
const port = process.env.PORT || 8080;

app.listen(8080, () => {
	console.log("Server started at port 8080");
});
