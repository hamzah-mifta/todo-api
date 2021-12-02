const request = require('supertest');
const app = require('../src/app');
const { TodoItem } = require('../src/models');
const { setupDatabase } = require('./fixtures/db');

// maintain db for testing
beforeEach(setupDatabase);

// CREATE
test('Should create new todo item', async () => {
  const response = await request(app)
    .post('/todo-items')
    .send({
      title: 'New Todo',
      activity_group_id: 1,
    })
    .expect(201);

  // check activity in database
  const todoItems = await TodoItem.findByPk(response.body.id);
  expect(todoItems).not.toBeNull();
});

test('Should not create new todo item with invalid title or activity group id', async () => {
  await request(app)
    .post('/todo-items')
    .send({
      title: 'New Todo',
      activity_group_id: 99,
    })
    .expect(400);
});

// READ
test('Should get all todo items', async () => {
  const response = await request(app).get('/todo-items').expect(200);

  expect(response.body.data.length).toBe(3);
});

test('Should fetch all todo items by group id', async () => {
  const response = await request(app)
    .get('/todo-items?activity_group_id=1')
    .expect(200);

  expect(response.body.data.length).toBe(2);
});

test('Should fetch todo item by id', async () => {
  const response = await request(app).get('/todo-items/1');

  const todoItem = await TodoItem.findByPk(response.body.id);
  expect(todoItem).not.toBeNull();
});

test('Should not fetch non exist todo item', async () => {
  await request(app).get('/todo-items/999999').expect(404);
});

// UPDATE
test('Should update todo item', async () => {
  const response = await request(app)
    .patch('/todo-items/3')
    .send({
      title: 'To do 2.1 (EDIT)',
      is_active: false,
      priority: 'normal',
    })
    .expect(200);

  // check if data updated according to request body
  const todoItem = await TodoItem.findByPk(response.body.id);

  expect(todoItem.title).toBe(response.body.title);
  expect(todoItem.is_active).toBe(response.body.is_active);
  expect(todoItem.priority).toBe(response.body.priority);
});

test('Should not update non exist todo item', async () => {
  await request(app)
    .patch('/todo-items/999999')
    .send({
      title: 'To do 2.1 (EDIT)',
      is_active: false,
      priority: 'normal',
    })
    .expect(404);
});

// DELETE
test('Should delete todo item group by id', async () => {
  await request(app).delete('/todo-items/3').send().expect(200);

  const todoItem = await TodoItem.findAll({ where: { id: 3 } });
  expect(todoItem.length).toBe(0);
});

test('Should delete multiple todo item by query', async () => {
  await request(app).delete('/todo-items/1?id=2,3').send().expect(200);

  const todoItem = await TodoItem.findAll();
  expect(todoItem.length).toBe(1);
});
