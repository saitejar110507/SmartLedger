from fastapi import APIRouter
from pydantic import BaseModel
from services.firebase import db  # Import Firestore instance

router = APIRouter()

# Define the Mood model
class Mood(BaseModel):
    mood: str
    comment: str
    date: str

# Firestore collection reference for moods
moods_ref = db.collection("moods")

@router.post("/moods")
def add_mood(mood: Mood):
    # Add the mood data to Firestore
    mood_dict = mood.dict()
    moods_ref.add(mood_dict)
    return {"message": "Mood added successfully", "data": mood_dict}
