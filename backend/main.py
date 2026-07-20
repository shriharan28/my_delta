from fastapi import FastAPI, Depends
from database import engine, get_db
import models, schemas
from sqlalchemy.orm import Session

models.Base.metadata.create_all(bind=engine)

app =FastAPI()

@app.post("/api/places", response_model=schemas.Place)
def create_places(place: schemas.PlaceCreate, db: Session = Depends(get_db)):
    db_place = models.Place(
        name = place.name,
        description = place.description,
        district = place.district
    )
    db.add(db_place)
    db.commit()
    db.refresh(db_place)
    return db_place

@app.get('/api/places', response_model=list[schemas.Place])
def get_places(db: Session = Depends(get_db)):
    places = db.query(models.Place).all()
    return places