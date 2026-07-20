from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

SQL_ALCHEMY_URL = "postgresql://postgres:Sriharan%4028@localhost:5432/delta_db"

engine = create_engine(SQL_ALCHEMY_URL)

SessionLocal = sessionmaker(autocommit = False, autoflush = False, bind = engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
        
    finally:
        db.close()    