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