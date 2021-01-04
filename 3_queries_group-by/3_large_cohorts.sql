SELECT cohorts.name AS cohort_name, COUNT(students.*) AS student_count
FROM cohorts 
JOIN students ON cohorts.id = cohort_id
GROUP BY cohorts.name
--- or: GROUP BY cohort_name
HAVING COUNT(students.*) >= 18
-- CAN NOT BE : HAVING student_count because it denifes in SELECT
ORDER BY COUNT(students.*);
--- or:ORDER BY student_count;