import os
from flask import Flask, render_template, redirect, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/signup')
def signup():
    plan = request.args.get('plan', 'creator')
    # For now, redirect back to home - you can implement signup later
    return redirect('/')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)