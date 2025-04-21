CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT
);

CREATE TABLE applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  jobId INT,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  resume TEXT,
  coverLetter TEXT,
  portfolio TEXT,
  status VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jobs (title, description) VALUES
('Full Stack Developer', 'Work on both frontend and backend. Build APIs, UI, and databases for the hiring platform.'),
('Frontend Developer', 'Build beautiful and functional user interfaces using modern frameworks like Vue.js.'),
('Backend Developer', 'Design and develop scalable APIs, database schemas, and integrations.'),
('Quality Analyst / Technical Tester', 'Test features end-to-end, write test cases, and ensure high product quality.');


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (email, password) VALUES
('testuser@example.com', '123456');

CREATE TABLE IF NOT EXISTS exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  duration INT, -- in minutes
  pass_percentage INT DEFAULT 50
);

CREATE TABLE IF NOT EXISTS questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_id INT,
  question_text TEXT,
  option_a VARCHAR(255),
  option_b VARCHAR(255),
  option_c VARCHAR(255),
  option_d VARCHAR(255),
  correct_option VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS assigned_exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  candidate_id INT,
  exam_id INT,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'assigned'
);

CREATE TABLE IF NOT EXISTS submitted_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  candidate_id INT,
  exam_id INT,
  question_id INT,
  selected_option VARCHAR(10),
  is_correct BOOLEAN,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exam_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  candidate_id INT,
  exam_id INT,
  score INT,
  passed BOOLEAN,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE submitted_answers
ADD COLUMN user_id INT;

ALTER TABLE submitted_answers
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE questions
ADD COLUMN difficulty VARCHAR(50),
ADD COLUMN type VARCHAR(50);


ALTER TABLE exam_results
ADD FOREIGN KEY (candidate_id) REFERENCES applications(id) ON DELETE CASCADE,
ADD FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE;

ALTER TABLE exam_results ADD COLUMN total_questions INT;
