import os
from flask import Flask, render_template, redirect, request, send_from_directory

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/signup')
def signup():
    plan = request.args.get('plan', 'creator')
    # For now, redirect back to home - you can implement signup later
    return redirect('/')

@app.route('/privacy-policy')
def privacy_policy():
    return render_template('privacy-policy.html')

@app.route('/terms-of-service')
def terms_of_service():
    return render_template('terms-of-service.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/support')
def support():
    return render_template('support.html')

@app.route('/.well-known/apple-developer-merchantid-domain-association')
def apple_pay_domain_association():
    return send_from_directory('static', 'apple-developer-merchantid-domain-association', mimetype='text/plain')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port, debug=True)