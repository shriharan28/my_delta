from pydantic import BaseModel

class PlaceBase(BaseModel):
    name: str
    description: str
    district: str
    
class PlaceCreate(PlaceBase):
    pass    

class Place(PlaceBase):
    id: int
    is_approved: bool
    
    class Config:
        from_attributes = True