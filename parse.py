#!/usr/bin/env python3

import xml.etree.ElementTree as ET
import mysql.connector as sql
import sys
import os

def listToString(s):  
    
    str1 = ","  
    return (str1.join(s)) 

db = sql.connect(
    host = "localhost",
    user = "root",
    password =""
)

cursor = db.cursor()

cursor.execute("CREATE DATABASE HealthMap")

db = sql.connect(
    host = "localhost",
    user = "root",
    password ="",
    database = "HealthMap"
)

cursor = db.cursor()

cursor.execute("CREATE TABLE ClinicalTrials (id VARCHAR(255), drugs VARCHAR(1000),disease VARCHAR(1000),countries VARCHAR(255),date VARCHAR(255))")
db.commit()

directory=sys.argv[1]

for roots,dirs,files in os.walk(directory):
	for file in files:
		if file.endswith('.xml'):
			root = ET.parse(roots+'/'+file).getroot()


			for description in root.iter('id_info'):
				for desc in description.iter('nct_id'):
					id1=desc.text


			countries=[]
			for description in root.iter('location_countries'):
				for desc in description.iter('country'):
					countries.append(desc.text)

			drug=[]
			for description in root.iter('intervention'):
				for desc in description.iter('intervention_name'):
					drug.append(desc.text)

			date=None
			for description in root.iter('start_date'):
				date=description.text

			disease=[]
			for description in root.iter('condition_browse'):
				for desc in description.iter('mesh_term'):
					disease.append(desc.text)

			for coun in countries:
				query = "INSERT INTO ClinicalTrials (id, drugs,disease,countries,date) VALUES (%s, %s,%s,%s,%s)"

				values = (id1,listToString(drug),listToString(disease),coun,date)
				try:
					cursor.execute(query, values)
					db.commit()
				except:
					pass
