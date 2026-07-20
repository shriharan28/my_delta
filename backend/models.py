from sqlalchemy import Boolean, Column, Integer, String, Text, ForeignKey
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="user")
    home_district = Column(String)
    
class Place(Base):
    __tablename__ = "places" 
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description =Column(Text)
    district = Column(String, index =True)
    is_approved = Column(Boolean, default= False)