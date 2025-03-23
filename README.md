# Job hiring platform

## Project Details

### here are the hiring platform steps:

1. First apply and take aptitude and reasoning exam: passing 50%, no negative marking; if passed then take step 2:
2. Take assignment immediately and submit within 7 days
3. Assignment reviewed within 7 days manually and if passed step 4:
4. Online/Offline technical interview-1; if passed then step 5:
5. Final face to face 2 interviews 1. Salary negotiation & culture fit round. and 2. technical interview-2;

### this product flow should be

1. show all job openings
2. Detail of Jobs with hiring process steps details
3. Apply for the job with your contact details and CV, cover latter, portfolio and job title for which you are apply for. According to selected job you have the immediately test of aptitude, reasoning and technical exam: passing 50%, no negative marking;
4. if passed on previous step you will get assignment immediately to submit within 7 days
5. Assignment submission form to send there assignment using github public repo/document url directly open without login. if we are unable to read the assignment, it will automatic disqualify. We will review this assignment within 7 days. If failed we notify and update you on your email. If passed then process to next round with scheduled online/offline technical interview.
6. Technical round happen online/offline. if passed then promoted to schedule final face to face round interview
7. Face to face interview with culture fit, salary round and one final technical round.
8. If passed the 7th step then released the offer letter and joining date.

### Technology used:

1. Vuejs3
2. Express
3. MySQL8
4. Running on Lambda

## local setup

### Backend setup

1. `cd backend`
2. `cp .env.example .env` set your local setup
3. `npm install`
4. Create database on local MySQL8 server and run the queries writter in `backend/db.sql` file
5. `npm run dev`

### Frontend setup

1. `cd frontend`
2. `cp .env.example .env` set your local setup
3. `npm install`
4. `npm run dev`
