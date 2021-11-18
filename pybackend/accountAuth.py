import requests 

#https://blog.icodes.tech/posts/python-firebase-authentication.html

apiKey = 'AIzaSyC1u5LF8UdxWJEkFB1k4y4iA4Njv1c8yck'

def SignUp(name, email, password):
    details = {
        'name': name,
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

#print(SignUp('User','user@example.com','password'))

def SignIn(email,password):
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
            return {'status':'success','idToken':r.json()['idToken']}

#print(SignIn('nguyentlan04@gmail.com', '123456'))
#print(SignIn('user@example.com','password'))

