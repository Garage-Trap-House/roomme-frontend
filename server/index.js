const express = require('express')
const cors = require('cors')
const app = express()

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

const port = process.env.PORT || 3001;

app.listen(3001, () => {
	console.log("Server started at port 3001");
});
