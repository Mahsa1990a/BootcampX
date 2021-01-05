SELECT cohorts.name AS onename, AVG(completed_at - started_at) AS average_assistance_time
--can't alias cohorts.name -> name , it has conflict with table
FROM assistance_requests
JOIN students ON assistance_requests.student_id = students.id
-- JOIN students ON student_id = students.id (is okay, but it's better to do this for future with complicated tables)
JOIN cohorts ON students.cohort_id = cohorts.id
--GROUP BY cohorts.name
GROUP BY onename
ORDER BY average_assistance_time;