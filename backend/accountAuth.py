import requests 
import firebase_admin
from firebase_admin import credentials, firestore

# https://blog.icodes.tech/posts/python-firebase-authentication.html


apiKey = 'AIzaSyC1u5LF8UdxWJEkFB1k4y4iA4Njv1c8yck'

cred = credentials.Certificate("serviceAccountKey.json")
firebase = firebase_admin.initialize_app(cred)

def signUp(email, password):

    details = {
        'email': email,
        'password': password,
        'returnSecureToken': True
    }

    #send post request 
    r = requests.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={}'.format(apiKey),data=details)

    #check for errors in result 
    if 'error' in r.json().keys():
        return {'status':'error','message':r.json()['error']['message']}
    
    #if the registration succeeded
    if 'idToken' in r.json().keys() :
        return {'status':'success','idToken':r.json()['idToken']}

#print(signUp('nguyentlan04@gmail.com','password'))

def signIn(email,password):
    details = {
        'email': email,
        'password': password,
        'returnSecureToken': True
    }

    #post request 
    r=requests.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={}'.format(apiKey),data=details)
    #check for errors
    if 'error' in r.json().keys():
        return {'status':'error','message':r.json()['error']['message']}
    #success
    if 'idToken' in r.json().keys() :
            idToken = {'idToken':r.json()['idToken']}
            print(idToken)
            return {'status':'success','idToken':r.json()['idToken']}

print(signIn('nguyentlan04@gmail.com', 'hahaha'))
#print(signIn('user@example.com','password'))

def signOut(email):
    details = {
        'email': email,
    }
    
    return 'you have been signed out!'

#print(signOut('user@example.com'))
def getData(idToken):
    details={
        'idToken':idToken
    }
    r=requests.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key={}'.format(apiKey),data=details)
    if 'error' in r.json().keys():
        return {'status':'error','message':r.json()['error']['message']}
    if 'users' in r.json():
        return {'status':'success','data':r.json()['users']}

#print(getData("eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5NGNmYTAxOTgyMDNlMjgwN2Q4MzRkYmE2MjBlZjczZjI4ZTRlMmMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTGFuIiwiaXNzIjoiaHR0c
# HM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NzLTQ4MDAtcHJvamVjdCIsImF1ZCI6ImNzLTQ4MDAtcHJvamVjdCIsImF1dGhfdGltZSI6MTYzNjQyMzYwNCwidXNlcl9pZCI6IjFXS2V6RjRiWDVPRG4z
# SVVlVHo5MzkyMXNKNTMiLCJzdWIiOiIxV0tlekY0Ylg1T0RuM0lVZVR6OTM5MjFzSjUzIiwiaWF0IjoxNjM2NDIzNjA0LCJleHAiOjE2MzY0MjcyMDQsImVtYWlsIjoibmd1eWVudGxhbjA0QGdtYWlsLmNvbS
# IsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJuZ3V5ZW50bGFuMDRAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Wd
# pdqON06RgwyooK8NScq352RqS6zMCQvTnuG6LgMeqNUjgAM3qpalniwJcXJbDkd6Us1O-c7ZnxpYrnV9HgUBSdOKGjDyx3NtuYCO_scKXLQNdAUBh_c1Q492PnN8DNrksdhnJXTHkpIXLtvzfEU3sU9jErFzTPzLv1i_PRzj
# ruWA_lkH0Uxz6VLbP1mbQLze91oZwiYUbeea51evSqkkroup5Yc6Cc9HlZj9LxZfo9lxSj-hItj3RAEz4jLNvFSE5L96eikUNbYuokzqYnHozjyrI7fJD0wlycNxXt5D90yTZlMfpIbRwQSwRM-M7d8ycU1dWiYSGiFyffKxlbfQ"))

