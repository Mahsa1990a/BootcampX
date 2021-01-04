CREATE TABLE assignments (

  id SERIAL PRIMARY KEY NOT NULL, --A unique identifier
  name VARCHAR(255), --The name of the assignment
  content TEXT, --The written content body of the assignment
  day INTEGER, --The day that the assignment appears on
  chapter INTEGER, --The order that the assignment will appear in the day
  duration INTEGER --The average time it takes a student to finish

);

CREATE TABLE assignment_submissions (

  id SERIAL PRIMARY KEY NOT NULL, ----A unique identifier
  assignment_id INTEGER REFERENCES assignments(id) ON DELETE CASCADE, --The id of the assignment
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE, --The id of the student
  duration INTEGER, --The time it took the student to complete the assignment
  submission_date DATE --The date is was submitted

);

