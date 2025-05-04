from fastapi import APIRouter
from services.firebase import db  # Import Firestore instance

router = APIRouter()

# Firestore collection references
transactions_ref = db.collection("transactions")
moods_ref = db.collection("moods")

@router.get("/combined_data")
def get_combined_data():
    # Fetch all transactions and moods from Firestore
    transactions = transactions_ref.stream()
    moods = moods_ref.stream()

    transaction_list = [transaction.to_dict() for transaction in transactions]
    mood_list = [mood.to_dict() for mood in moods]

    # Combine the data by matching the date
    combined_data = []
    for mood in mood_list:
        for transaction in transaction_list:
            if mood["date"] == transaction["date"]:
                combined_data.append({
                    "date": mood["date"],
                    "mood": mood["mood"],  # Mood field
                    "amount": transaction["amount"],  # Transaction amount
                    "category": transaction["category"],  # Transaction category
                })

    return {"combined_data": combined_data}
