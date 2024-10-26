import numpy as np
import pandas as pd
import random

# Set random seed for reproducibility
np.random.seed(42)

# Number of samples to generate
n_samples = 10000

# Generate random GPAs between 4 and 10
gpas = np.round(np.random.uniform(4.0, 10.0, n_samples), 2)

# Generate random certifications and skills count (between 0 and 10 certifications/skills)
certifications_skills = np.random.randint(0, 10, n_samples)

# Define college tiers
college_names = [f"College_{i}" for i in range(1, 101)]  # 100 synthetic colleges
college_tiers = np.random.choice(['Tier 1', 'Tier 2', 'Tier 3'], size=len(college_names), p=[0.2, 0.5, 0.3])

# Assign median and highest salaries based on college tier
tier_salary_ranges = {
    'Tier 1': (1000000, 3000000),  # Salaries in INR for Tier 1 colleges
    'Tier 2': (500000, 2000000),   # Salaries for Tier 2
    'Tier 3': (300000, 1000000)    # Salaries for Tier 3
}

median_salaries = []
highest_salaries = []

for tier in college_tiers:
    median_salary = np.random.randint(*tier_salary_ranges[tier])
    highest_salary = median_salary + np.random.randint(500000, 2000000)
    median_salaries.append(median_salary)
    highest_salaries.append(highest_salary)

# Map colleges to their tier, median, and highest salary
college_to_tier = dict(zip(college_names, college_tiers))
college_to_median_salary = dict(zip(college_names, median_salaries))
college_to_highest_salary = dict(zip(college_names, highest_salaries))

# Assign random college names
colleges = np.random.choice(college_names, size=n_samples)

# Generate random CIBIL scores between 300 and 900
cibil_scores = np.random.randint(300, 900, n_samples)

# Parent Income: Normally distributed income between 2 LPA and 25 LPA
parent_income = np.random.normal(10, 5, n_samples)  # Mean of 10 LPA with a std deviation of 5 LPA
parent_income = np.clip(parent_income, 2, 25)  # Clipping between 2 LPA and 25 LPA

# Define city tiers and assign cities based on colleges
city_names = [f"City_{i}" for i in range(1, 11)]  # 10 synthetic cities
city_tiers = np.random.choice(['Tier 1', 'Tier 2', 'Tier 3'], size=len(city_names), p=[0.3, 0.4, 0.3])

city_to_tier = dict(zip(city_names, city_tiers))
college_to_city = {college: random.choice(city_names) for college in college_names}

# Placement Ratio: Higher for better-tier colleges
placement_ratios = []
for college in colleges:
    tier = college_to_tier[college]
    if tier == 'Tier 1':
        placement_ratio = np.random.uniform(0.85, 1.0)
    elif tier == 'Tier 2':
        placement_ratio = np.random.uniform(0.75, 0.85)
    else:
        placement_ratio = np.random.uniform(0.5, 0.75)
    placement_ratios.append(placement_ratio)

# Calculate salaries based on GPA, certifications, college tier, and city tier
salaries = []
for i in range(n_samples):
    gpa = gpas[i]
    certifications = certifications_skills[i]
    college = colleges[i]
    median_salary = college_to_median_salary[college]
    highest_salary = college_to_highest_salary[college]
    city = college_to_city[college]
    city_tier = city_to_tier[city]
    
    # Salary adjustment based on city tier
    city_adjustment = 1.2 if city_tier == 'Tier 1' else (1.0 if city_tier == 'Tier 2' else 0.8)
    
    # Base salary calculation with adjustment for GPA, certifications, and city tier
    salary = median_salary + (highest_salary - median_salary) * (gpa - 5) / 5 + certifications * 10000
    salary *= city_adjustment
    
    # Random adjustment and cap at highest salary
    salary += np.random.normal(0, 100000)
    salary = min(salary, highest_salary)
    
    salaries.append(salary)

# Credit Worthiness Calculation
w1, w2, w3, w4, w5 = 0.3, 0.2, 0.2, 0.2, 0.1  # Weights for GPA, Certifications, Placement Ratio, CIBIL, Parent Income

creditworthiness_scores = []
for i in range(n_samples):
    gpa_score = (gpas[i] - 4) / 6  # GPA normalized between 0 and 1
    certifications_score = certifications_skills[i] / 10  # Certifications normalized between 0 and 1
    placement_ratio = placement_ratios[i]  # Already between 0 and 1
    cibil_score = (cibil_scores[i] - 300) / 600  # CIBIL normalized between 0 and 1
    parent_income_score = (parent_income[i] - 2) / 23  # Parent income normalized between 0 and 1
    
    creditworthiness = (w1 * gpa_score) + (w2 * certifications_score) + (w3 * placement_ratio) + \
                       (w4 * cibil_score) + (w5 * parent_income_score)
    
    creditworthiness_scores.append(creditworthiness)

# Create DataFrame
student_creditworthiness_data = pd.DataFrame({
    'GPA': gpas,
    'Certifications & Skills': certifications_skills,
    'College': colleges,
    'City': [college_to_city[college] for college in colleges],
    'College Tier': [college_to_tier[college] for college in colleges],
    'City Tier': [city_to_tier[college_to_city[college]] for college in colleges],
    'Placement Ratio': placement_ratios,
    'CIBIL Score': cibil_scores,
    'Parent Income (LPA)': parent_income,
    'Salary (INR)': salaries,
    'Credit Worthiness': creditworthiness_scores
})

# Save to CSV
student_creditworthiness_data.to_csv('student_creditworthiness_synthetic_data.csv', index=False)

# Check first few rows of the dataset
print(student_creditworthiness_data.head())
