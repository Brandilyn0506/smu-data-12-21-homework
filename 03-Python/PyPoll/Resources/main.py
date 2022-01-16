#In this challenge, you are tasked with helping a small, rural town modernize its vote counting process.

#You will be give a set of poll data called election_data.csv. The dataset is composed of three columns: Voter ID, County, and Candidate. Your task is to create a Python script that analyzes the votes and calculates each of the following:

#The total number of votes cast

#A complete list of candidates who received votes

#The percentage of votes each candidate won

#The total number of votes each candidate won

#The winner of the election based on popular vote.

# Modules
import os
import csv

# Set path for file
election_csv= "PyPoll\Resources\election_data.csv"

# Open the CSV
with open(election_csv) as text:
    csvreader = csv.reader(text, delimiter=",")
    csv_header = next(csvreader)
    
    for row in csvreader:
        vote = 0
        list_candidates = []
        candidates = []

        vote = vote + 1
        
        list_candidates.append(row[2])
          
    if row not in candidates:
        candidates.append(row)

        print(candidates)
      

    # for x in set(list_candidates):
    #     candidates.append(x)

    # print(candidates)


        



        

       
        #print(row)

#     lines = text.read()

# for row in election_csv:

#     row = 0

#The total number of votes cast






    