const { Pool } = require('pg');

//Connect to the bootcampx database in students.js
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// pool.query(`
//   SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
//   FROM teachers
//   JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
//   JOIN students ON assistance_requests.student_id = students.id
//   JOIN cohorts ON students.cohort_id = cohorts.id
//   WHERE cohorts.name LIKE '%${process.argv[2] || 'JUL02'}%'
//   ORDER BY teacher;
// `)
// .then(res => {
//   res.rows.forEach(user => {
//     //console.log(user);
//     console.log(`${user.cohort}: ${user.teacher}`);
//   })
// }).catch(err => console.error('query error', err.stack));


const queryString = `
  SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
  FROM teachers
  JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
  JOIN students ON assistance_requests.student_id = students.id
  JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  ORDER BY teacher;
`;

const cohortName = process.argv[2] || 'JUL02';
const values = [`%${cohortName}%`];

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    //console.log(user);
    console.log(`${user.cohort}: ${user.teacher}`);
  })
}).catch(err => console.error('query error', err.stack));

