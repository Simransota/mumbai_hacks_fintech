from pydantic import BaseModel

class student(BaseModel):
    GPA: float
    No_of_certification: float
    college_name: str 
    # placement_ratio: float 
    parent_income: float
    cibil_score: int