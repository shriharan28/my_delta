from sqlalchemy import create_engine
from sqlalchemy import sessionmaker
from sqlalchemy.ext.declarative import declaravtive_base

SQL_ALCHEMY_URL = "postegresql://postegres:Sriharan@28@localhost:5432/delta_db"

engine = create_engine(SQL_ALCHEMY_URL)

SessionLocal = sessionmaker(autocommit = False, autoflush = False, bind = engine)

Base = declaravtive_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
        
    finally:
        db.close()    