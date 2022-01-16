from calendar import c
import os
import csv
from statistics import mean
from tabnanny import filename_only

#add file path
budget_csv = "Resources\\budget_data.csv"

#Set Variables
months = []
months_change = []
num_months = 0
profit_loss = []
net_total = 0
c_revenue = 0
p_revenue = 0
rev_change = 0
change_list = []
average_change = 0



# Open the CSV
with open(budget_csv, "r") as file:
    csvreader = csv.reader(file, delimiter=",")

    csv_header = next(csvreader)

    print(csv_header)
    print()

#find total months
    for row in csvreader:
        num_months += 1 

        months.append(row[0])        
    
      # print(num_months)

        #list profit/loss amounts
        profit_loss.append(int(row[1]))

        #sum amounts
        net_total = sum(profit_loss)

    # get changes over entire period
    for amount in range(len(profit_loss)-1):
        rev_change = profit_loss[amount+1] - profit_loss[amount]

        change_list.append(rev_change)
        
    # print(change_list)

    #average changes
    average_change =mean(change_list)
    
    #round average
    average_change = round(average_change,2)
    # print(average_change)

    #find greatest incease/decrease
    max_increase = max(change_list)
    max_decrease = min(change_list)


    # print(max_increase)
    # print(max_decrease)
    
    increase_date = months[change_list.index(max_increase)+1] 
    decrease_date = months[change_list.index(max_decrease)+1] 

    # print(increase_date)
    # print(decrease_date)

#print summary
financial_summary=(
        f"Financial Summary\n"
        f"\n-------------------------\n"
        f"Total Months: {num_months}\n"
        f"Total: ${net_total}\n"
        f"Average Change: ${average_change}\n"
        f"Greatest Increase in Profits: {increase_date} (${max_increase})\n"
        f"Greatest Decrease in Profits: {decrease_date} (${max_decrease})\n"       
        f"----------------------------\n"
)

# print(financial_summary)

with open("financial_summary_hall", "w") as file:
    file.write(financial_summary)







        

        


