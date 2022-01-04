/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../src/app');
const { Activities } = require('../src/models');
const { setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

// CREATE
test('Should create new activity group', async () => {
  const response = await request(app)
    .post('/activity-groups')
    .send({
      title: 'New Activity',
      email: 'hamz@mail.id',
    })
    .expect(201);

  // check activity in database
  const activity = await Activities.findByPk(response.body.data.id);
  expect(activity).not.toBeNull();
});

test('Should not create activity group with blank title', async () => {
  await request(app)
    .post('/activity-groups')
    .send({
      title: '',
    })
    .expect(400);
});

// READ
test('Should get all activity groups', async () => {
  const response = await request(app).get('/activity-groups').expect(200);

  expect(response.body.data.length).toBe(3);
});

test('Should fetch activity group by id', async () => {
  const response = await request(app).get('/activity-groups/1');

  const activity = await Activities.findByPk(response.body.data.id);
  expect(activity).not.toBeNull();
});

test('Should not fetch non exist activity group', async () => {
  await request(app).get('/activity-groups/123').expect(404);
});

// // UPDATE
test('Should update activity group', async () => {
  const response = await request(app)
    .patch('/activity-groups/2')
    .send({
      title: 'Activity (EDIT)',
      email: 'edit@email.com',
    })
    .expect(200);

  // check if data updated according to request body
  const activity = await Activities.findByPk(response.body.data.id);

  expect(activity.title).toBe(response.body.data.title);
  expect(activity.email).toBe(response.body.data.email);
});

test('Should not update activity group with blank body', async () => {
  await request(app).patch('/activity-groups/1').send({}).expect(400);
});

test('Should not update non exist activity group', async () => {
  await request(app)
    .patch('/activity-groups/123')
    .send({
      title: 'Activity (EDIT)',
      email: 'edit@email.com',
    })
    .expect(404);
});

// // DELETE
test('Should delete activity group by id', async () => {
  await request(app).delete('/activity-groups/3').send().expect(200);

  const activity = await Activities.findAll({ where: { id: 3 } });
  expect(activity.length).toBe(0);
});

test('Should not delete non exist activity group', async () => {
  await request(app).delete('/activity-groups/123').send().expect(404);
});
