# Loops
# FOr Loop
# Lists

# a = [100,90,99]
# print(a[2])
# for i in a:
#     print(i)


# i will be taking the values of 0,1,2
# for i in range(len(a)):
#     print(a[i])


# for i,value in enumerate(a):
#     print(i,value)

#Array slicing/List slicing
# a = [["Abhi",20],['Ram',35],['Brandilyn',57]]
# # b = []
# print(a[0:2])
# # for i in a:
# #     print(i[1])

# for i in range(len(a)):

#     b.append(a[i][1])

# print(b)


# While Loop

import os
filepath_election_data = "PyPoll/Resources/election_data.csv"
filepath_budget_data = "../../PyBank/Resources/budget_data.csv"

import csv

# Open the CSV
with open(filepath_election_data) as whatever:
    csvreader = csv.reader(whatever, delimiter=",")

    # Loop through looking for the video
    for row in csvreader[:5]:
        print(row)
        
# Press ctrl+c to interrupt this
# Ctrl + / for commenting
