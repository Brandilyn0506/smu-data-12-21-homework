--List the following details of each employee: employee number, last name, first name, sex, and salary.

SELECT e.emp_no, e.last_name, e.first_name, e.sex,s.salary
FROM employees AS e
JOIN salaries AS s ON e.emp_no = s.emp_no;

--List first name, last name, and hire date for employees who were hired in 1986.

SELECT
	first_name,
	last_name,
	hire_date
FROM
	employees
WHERE
	hire_date <= '1986-12-31' and hire_date >= '1986-01-01';

--List the manager of each department with the following information: department number, department name,
--the manager's employee number, last name, first name.

SELECT dp.dept_no, dp.dept_name, dm.emp_no, e.last_name,e.first_name
FROM employees AS e
JOIN dept_manager AS dm ON e.emp_no = dm.emp_no
JOIN departments AS dp ON dm.dept_no = dp.dept_no;

--List the department of each employee with the following information: employee number, last name, first name, and department name.

SELECT e.emp_no, e.last_name, e.first_name, dp.dept_name
FROM employees AS e
JOIN dept_emp AS de ON e.emp_no = de.emp_no
JOIN departments AS dp ON de.dept_no = dp.dept_no;

--List first name, last name, and sex for employees whose first name is "Hercules" and last names begin with "B."
SELECT first_name, last_name, sex
FROM employees 
WHERE first_name = 'Hercules' and last_name like 'B%';

--List all employees in the Sales department, including their employee number, last name, first name, and department name.
SELECT de.emp_no, e.last_name, e.first_name, dp.dept_name
FROM employees AS e
JOIN dept_emp AS de ON e.emp_no = de.emp_no
JOIN departments AS dp ON de.dept_no = dp.dept_no
WHERE dept_name = 'Sales';

--List all employees in the Sales and Development departments, including their employee number, 
--last name, first name, and department name.
SELECT de.emp_no, e.last_name, e.first_name, dp.dept_name
FROM employees AS e
JOIN dept_emp AS de ON e.emp_no = de.emp_no
JOIN departments AS dp ON de.dept_no = dp.dept_no
WHERE dept_name = 'Sales' or dept_name = 'Development';

--In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.
SELECT last_name, COUNT(last_name) AS "number_of_last_names"
FROM employees
GROUP BY last_name
ORDER BY "number_of_last_names" DESC;