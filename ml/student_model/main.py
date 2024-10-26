import uvicorn 
from fastapi import FastAPI
from student import student 
import pickle
from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler()
app = FastAPI()
pickle_in = open("student_model.pkl","rb")
model = pickle.load(pickle_in)


@app.get('/')
def index():
    return {'message':'hello, World'}


@app.post('/predict')
def predict(data:student):
    data = data.dict()
    print(data)
    print('hello')
    
    GPA = data['GPA']
    scaled_GPA = scaler.transform('GPA')
    print(GPA)


    No_of_certification = data['No_of_certification']
    scaled_no_of_certifications = scaler.transform('No_of_certification')
    print(No_of_certification)
    college_tier_tier2 = 0
    college_tier_tier3 = 0
    
    City_tier_tier2 = 0 
    City_tier_tier3 = 0 
    
    college_name = data['college_name']
    #function to find placement ratio , college tier , city tier, median_salary
    
    if college_tier = '2':
        college_tier_tier2 = 1
        
    if college_tier = '3':
        college_tier_tier3 = 1
        
    if city_tier = '2':
        City_tier_tier2 = 1
        
    if city_tier = '3':
        City_tier_tier3 = 1
        
        
    # placement ratio
    # scaled_cn = scaler.transform('placement_ratio')
    # print(placement_ratio)
    
    parent_income= data['parent_income']
    scaled_pi = scaler.transform['parent_income']
    print(parent_income)
    
    cibil_score = data['cibil_score']
    scaled_cs = scaler.transform['cibil_score']
    print(cibil_score)
    
    Credit_worthiness = model.predict(scaled_GPA,scaled_no_of_certifications,scaled_placement_ratio,scaled_cs,scaled_pi,scaled_median_salary,college_tier_tier2,college_tier_tier3,City_tier_tier2,City_tier_tier3 )
    return {
        'Credit_worthiness': Credit_worthiness
    }
    
    
if __name__ == '__main__':
    uvicorn.run(app , host='127.0.0.1',port=8000)
    
#uvicorn main:app --reload 