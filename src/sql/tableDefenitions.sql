CREATE TABLE snippet_type (
  id INT SERIAL PRIMARY KEY,
  type VARCHAR,
  active boolean
);

CREATE TABLE snippets (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  content VARCHAR,
  language VARCHAR,
  snippet_type_id INT,
  owner_id VARCHAR,
  pinned boolean,
  archived boolean,
  created_at timestamp,
  updated_at timestamp,
  deleted_at timestamp,
  CONSTRAINT fk_snippet_type_id
    FOREIGN KEY(snippet_type_id) 
    REFERENCES snippet_type(id)
);

CREATE TABLE to_do_list (
  id INT SERIAL PRIMARY KEY,
  description VARCHAR,
  owner_id VARCHAR,
  archived boolean,
  created_at timestamp,
  updated_at timestamp,
  deleted_at timestamp
);

