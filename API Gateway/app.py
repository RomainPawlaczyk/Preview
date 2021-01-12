# app.py, simple api gateway
from flask import Flask, request
import asyncio
from userServiceController import userHandler
from flask_cors import CORS

# Create instance of user service controller
userServiceController = userHandler()

# Create HTTP server
app = Flask(__name__)

# Enable CORS
CORS(app)

### User Service Routing
# User register route
@app.route('/api/user/signUp', methods=['POST'])
def signup():
    return asyncio.run(userServiceController.signup(request.data))

# User login route
@app.route('/api/user/signIn', methods=['POST'])
def signin():
    return asyncio.run(userServiceController.signin(request.data))

# User reset password link route
@app.route('/api/user/resetPasswordLink', methods=['POST'])
def resetPasswordLink():
    return asyncio.run(userServiceController.resetPasswordLink(request.data))

# User reset password route
@app.route('/api/user/resetPassword', methods=['POST'])
def resetPassword():
    return asyncio.run(userServiceController.resetPassword(request.data))

# User confirm email link route
@app.route('/api/user/confirmUserEmailLink', methods=['POST'])
def confirmUserEmailLink():
    return asyncio.run(userServiceController.confirmUserEmailLink(request.data))

# User confirm email route
@app.route('/api/user/confirmEmail', methods=['POST'])
def confirmEmail():
    return asyncio.run(userServiceController.confirmEmail(request.data))

# User handle token verification route
@app.route('/api/user/handleTokenVerification', methods=['POST'])
def handleTokenVerification():
    return asyncio.run(userServiceController.handleTokenVerification(request.data))

# User validate first connection route
@app.route('/api/user/validateFirstConnection', methods=['POST'])
def validateFirstConnection():
    return asyncio.run(userServiceController.validateFirstConnection(request.data))

# User validate OTP route
@app.route('/api/user/validateOtp', methods=['POST'])
def validateOtp():
    return asyncio.run(userServiceController.validateOtp(request.data))
### end of User Service Routing

# Run server on port 5000
if __name__ == '__main__':
    app.run(threaded=True, port=5000)
