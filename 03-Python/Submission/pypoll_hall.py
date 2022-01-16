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
election_csv= "Resources\election_data.csv"


# Set variables
vote = 0
list_candidates = []
candidate_votes = {}
number_of_votes = []
percentage_votes = {}
total_percent = []

# Open the CSV
with open(election_csv,"r") as file:
    csvreader = csv.reader(file, delimiter=",")

    csv_header = next(csvreader)

    print(csv_header)
    print()

    
    for row in csvreader:    
        #count number of votes
        vote = vote + 1 


        # get list of candidates
        name_of_candidates = row[2]

        #get unique list of candidates
        if name_of_candidates not in list_candidates:
            list_candidates.append(name_of_candidates)

        #count candidate votes
            candidate_votes[name_of_candidates] = 0

        candidate_votes[name_of_candidates] += 1  

        
    for name_of_candidates in candidate_votes:
         results = candidate_votes.get(name_of_candidates)
         percentage_votes = float(results) / float(vote) * 100
         percentage_votes = (round(percentage_votes))
         percentage_votes = str(percentage_votes)
         total_percent.append(percentage_votes)
         
         
    # print(total_percent)
    


    winner = max(candidate_votes, key=candidate_votes.get)

    oTooley = "O'Tooley"

    # print(winner)

#     print(candidate_votes[0])
election_results =(
        f"Election Results"
        f"\n-------------------------\n"
        f"Total Votes: {vote}\n"
        f"----------------------------\n"
        f"{list_candidates[0]}: {total_percent[0]}% ({candidate_votes.get('Khan')}) \n"
        f"{list_candidates[1]}: {total_percent[1]}% ({candidate_votes.get('Correy')})\n"
        f"{list_candidates[2]}: {total_percent[2]}% ({candidate_votes.get('Li')})\n"
        f"{list_candidates[3]}: {total_percent[3]}% ({candidate_votes.get(oTooley)})\n"
        f"----------------------------\n"
        f"Winner: {winner}\n"        
        f"----------------------------\n"
)

print(election_results)

with open("election_analysis_hall.txt", "w") as file:
    file.write(election_results)
         
       

    