drop table tasks.users;
drop table tasks.tasks;
drop table tasks.task_group;

CREATE TABLE tasks.users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR,
  email VARCHAR,
  owner_id VARCHAR,
  avatar_url VARCHAR,
  created_at timestamp,
  updated_at timestamp,
  archived_at timestamp
);

CREATE TABLE tasks.task_group (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  user_id int,
  archived boolean,
  created_at timestamp,
  updated_at timestamp,
  archived_at timestamp,
  CONSTRAINT fk_user_id
    FOREIGN KEY(user_id) 
	  REFERENCES tasks.users(id)
);

CREATE TABLE tasks.tasks (
  id SERIAL PRIMARY KEY,
  task_group_id INT,
  title VARCHAR,
  notes VARCHAR,
  user_id int,
  due_date timestamp,
  archived boolean,
  created_at timestamp,
  updated_at timestamp,
  archived_at timestamp,
  CONSTRAINT fk_task_group
    FOREIGN KEY(task_group_id) 
	  REFERENCES tasks.task_group(id),
  CONSTRAINT fk_user_id
    FOREIGN KEY(user_id) 
	  REFERENCES tasks.users(id)
);
