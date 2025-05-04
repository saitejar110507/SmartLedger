import firebase_admin
from firebase_admin import credentials, firestore

# Correct way to initialize Firebase
cred = credentials.Certificate("services/firebase-adminsdk.json")
firebase_admin.initialize_app(cred)

# Get Firestore instance
db = firestore.client()
