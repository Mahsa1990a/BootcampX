const { Pool } = require('pg');

//Connect to the bootcampx database in students.js
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

//                                      query id, name, cohort_id from students
// pool.query(`       
//   SELECT id, name, cohort_id
//   FROM students
//   LIMIT 5;
// `) 

//                                       query id, name from students and name from cohorts
// pool.query(`
//   SELECT students.id, students.name AS student, cohorts.name AS cohort
//   FROM students
//   JOIN cohorts ON cohort_id = cohorts.id
//   LIMIT 5;
// `)

//                                       Adjust code ro run node students.js FEB 2 -> cohort name=FEB, limit = 2
// pool.query(`         
//   SELECT students.id, students.name AS student, cohorts.name AS cohort
//   FROM students
//   JOIN cohorts ON cohort_id = cohorts.id
//   WHERE cohorts.name LIKE '%${process.argv[2]}%'
//   LIMIT ${process.argv[3] || 5};
// `)
// .then(res => {
//   //console.log('this is res: ', res); //answer we want is inside res.rows
//   //console.log('This is expected answer res.rows: ', res.rows); //arr of obj, result is same as we get from psql
//   res.rows.forEach(user => {
//     console.log(user); //5 user objs
//     //console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_id} cohort`); //5 of them
//     //console.log(`${user.student} has an id of ${user.id} and was in the ${user.cohort} cohort`);
//   })
// }).catch(err => console.error('query error', err.stack));


const queryString = `
  SELECT students.id, students.name AS student, cohorts.name AS cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
`;

//The values that come from somewhere else:
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array. 
const values = [`%${cohortName}%`, limit];


pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    //console.log(user);
    console.log(`${user.student} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));