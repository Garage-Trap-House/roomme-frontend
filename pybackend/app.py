from flask import Flask, request, redirect, url_for, render_template, jsonify
from flask.templating import render_template
from flask_cors import CORS
import json

app = Flask(__name__, template_folder= 'template')
CORS(app)

response = ''

@app.route("/success/<name>")
def success(name):
    return 'welcome %s' % name 

@app.route('/login', methods = ['POST', 'GET'])
def login():
    if request.method == 'POST': 
        user = request.form['nm']
        return redirect(url_for('success', name = user))

    return render_template('login.html')
    
@app.route('/name', methods = ['POST', 'GET'])
def nameRoute():

    global response 
    
    if request.method == 'POST':
        request_data = request.data 
        request_data = json.loads(request_data.decode('utf-8'))
        name = request_data['name']
        response = f'Hi {name}! this is Python!'
        return ''
    else:       
        return jsonify({'name': response})

if __name__ == '__main__':
    app.run(debug = True)




# the host value allows traffic from anywhere to run this 
app.run(host = "0.0.0.0")