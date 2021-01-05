SELECT AVG(total_duration) AS average_total_duration 
FROM (
  SELECT cohorts.name as cohort, SUM(completed_at - started_at) AS total_duration
  FROM assistance_requests
  JOIN students ON assistance_requests.student_id = students.id
  JOIN cohorts ON students.cohort_id = cohorts.id
  GROUP BY cohort
) AS total_tables;

--SELECT avg (total_duration) as average_total_duration
--FROM (
  --SELECT cohorts.name as cohort, sum(completed_at-started_at) as total_duration
  --FROM assistance_requests
  --JOIN students ON students.id = student_id
  --JOIN cohorts on cohorts.id = cohort_id
  --GROUP BY cohorts.name
  --ORDER BY total_duration
--) as total_durations;