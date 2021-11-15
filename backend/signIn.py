import firebase_admin
import requests 
from firebase_admin import credentials, firestore, auth

# https://firebase.google.com/docs/reference/admin/python/firebase_admin.auth#generate_sign_in_with_email_link

cred = credentials.Certificate("serviceAccountKey.json")
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()


name = 'Lan'
email = 'nguyentlan04@gmail.com'
password = 'hahaha'
user_uid = None

details = {
        'email': email,
        'password': password,
        'returnSecureToken': True,
        'idToken':user_uid
    }


apiKey = 'AIzaSyC1u5LF8UdxWJEkFB1k4y4iA4Njv1c8yck'
r = requests.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={}'.format(apiKey),data=details)

data = {
    'name': name,
    'email': email,
    'password': password
}

idToken = {'idToken':r.json()['idToken']}
print(idToken)

if 'idToken' in r.json().keys() :
    idToken = {'idToken':r.json()['idToken']}
    print(idToken)


#db.collection('user').document(user_uid).set(data)  






