export const SNIPPET_TABLE_NAME = 'snippets';

export const SNIPPET_TYPES = {
  snippet: 1,
  note: 2,
  scratchPad: 3,
};

export const SNIPPETS_COLUMN_MAP = {
  id: false,
  title: true,
  content: true,
  language: true,
  snippet_type_id: true,
  owner_id: true,
  pinned: true,
  archived: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
};

export const getUpdateSnippetQuery = (body) => {
  const objectKeys = Object.keys(body);
  const columnArr = [];
  const values = [];
  let counter = 1;

  objectKeys.forEach((key) => {
    if (SNIPPETS_COLUMN_MAP[key]) {
      columnArr.push(`${key}=$${counter}`);
      values.push(body[key]);
      counter += 1;
    }
  });

  return {
    values,
    sql: columnArr.join(' , '),
  };
};
