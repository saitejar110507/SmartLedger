from fastapi import FastAPI
from routes import transactions  # Only import transactions for now

app = FastAPI()

# Include the routes for transaction and categorization endpoints
app.include_router(transactions.router)
# app.include_router(categorize.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to SmartLedger API"}
