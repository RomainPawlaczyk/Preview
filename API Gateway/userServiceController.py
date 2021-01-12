# userServiceController.py
import requests
import json

# User service controller class
class userHandler:
    def __init__(self):
        # user api: urls to call
        self.urls = {}
        self.urls['signup'] = 'https://www.pawlaczyk.fr:3001/api/user/signUp'
        self.urls['signin'] = 'https://www.pawlaczyk.fr:3001/api/user/signIn'
        self.urls['resetPasswordLink'] = 'https://www.pawlaczyk.fr:3001/api/user/resetPasswordLink'
        self.urls['resetPassword'] = 'https://www.pawlaczyk.fr:3001/api/user/resetPassword'
        self.urls['confirmUserEmailLink'] = 'https://www.pawlaczyk.fr:3001/api/user/confirmUserEmailLink'
        self.urls['confirmEmail'] = 'https://www.pawlaczyk.fr:3001/api/user/confirmEmail'
        self.urls['handleTokenVerification'] = 'https://www.pawlaczyk.fr:3001/api/user/handleTokenVerification'
        self.urls['validateFirstConnection'] = 'https://www.pawlaczyk.fr:3001/api/user/validateFirstConnection'
        self.urls['validateOtp'] = 'https://www.pawlaczyk.fr:3001/api/user/validateOtp'

    # User register controller
    async def signup(self, obj):
        res = requests.post(self.urls['signup'], data = json.loads(obj))
        return res.json()

    # User login controller
    async def signin(self, obj):
        res = requests.post(self.urls['signin'], data = json.loads(obj))
        return res.json()

    # User reset password link controller
    async def resetPasswordLink(self, obj):
        res = requests.post(self.urls['resetPasswordLink'], data = json.loads(obj))
        return res.json()

    # User reset password link controller
    async def resetPassword(self, obj):
        res = requests.post(self.urls['resetPassword'], data = json.loads(obj))
        return res.json()

    # User confirm email link controller
    async def confirmUserEmailLink(self, obj):
        res = requests.post(self.urls['confirmUserEmailLink'], data = json.loads(obj))
        return res.json()

    # User confirm email controller
    async def confirmEmail(self, obj):
        res = requests.post(self.urls['confirmEmail'], data = json.loads(obj))
        return res.json()

    # User handle token verification controller
    async def handleTokenVerification(self, obj):
        res = requests.post(self.urls['handleTokenVerification'], data = json.loads(obj))
        return res.json()

    # User validate first connection controller
    async def validateFirstConnection(self, obj):
        res = requests.post(self.urls['validateFirstConnection'], data = json.loads(obj))
        return res.json()

    # User validate OTP controller
    async def validateOtp(self, obj):
        res = requests.post(self.urls['validateOtp'], data = json.loads(obj))
        return res.json()
