import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import *

# https://firebase.google.com/docs/database/admin/save-data
# https://firebase.google.com/docs/firestore/manage-data/add-data

path = "serviceAccountKey.json"
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

data = {
    'name': 'Pomon',
    'state': 'CA',
    'country': 'USA'
}

db.collection('map').add(data)


house_update = db.collection('Accounts').document('Template')
house_update.update({'house': ""})