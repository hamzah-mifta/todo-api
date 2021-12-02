const request = require('supertest');
const app = require('../src/app');
const { ActivityGroup } = require('../src/models');
const { setupDatabase } = require('./fixtures/db');

// maintain db for testing
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
  const activity = await ActivityGroup.findByPk(response.body.id);
  expect(activity).not.toBeNull();
});

test('Should not create activity group with invalid title or email', async () => {
  await request(app)
    .post('/activity-groups')
    .send({
      email: 'wrong_email_format',
    })
    .expect(400);
});

// READ
test('Should get all activity groups', async () => {
  const response = await request(app).get('/activity-groups').expect(200);

  expect(response.body.data.length).toBe(3);
});

test('Should get all activity groups for email', async () => {
  const response = await request(app)
    .get(`/activity-groups?email=${encodeURIComponent('hamzah+1@mail.id')}`)
    .expect(200);

  expect(response.body.data.length).toBe(1);
});

test('Should fetch activity group by id', async () => {
  const response = await request(app).get(`/activity-groups/1`);

  const activity = await ActivityGroup.findByPk(response.body.id);
  expect(activity).not.toBeNull();
});

// UPDATE
test('Should update activity group', async () => {
  const response = await request(app)
    .patch('/activity-groups/2')
    .send({
      title: 'Activity (EDIT)',
      email: 'edit@email.com',
    })
    .expect(200);

  // check if data updated according to request body
  const activity = await ActivityGroup.findByPk(response.body.id);

  expect(activity.title).toBe(response.body.title);
  expect(activity.email).toBe(response.body.email);
});

test('Should not update non exist activity group', async () => {
  await request(app)
    .patch('/activity-groups/99999999')
    .send({
      title: 'Activity (EDIT)',
      email: 'edit@email.com',
    })
    .expect(404);
});

test('Should not update activity group with invalid email', async () => {
  await request(app)
    .patch('/activity-groups/1')
    .send({
      title: 'Activity (EDIT)',
      email: 'wrong_email_format',
    })
    .expect(400);
});

// DELETE
test('Should delete activity group by id', async () => {
  await request(app).delete('/activity-groups/3').send().expect(200);

  const activity = await ActivityGroup.findAll({ where: { id: 3 } });
  expect(activity.length).toBe(0);
});

test('Should not delete non exist activity group', async () => {
  await request(app).delete('/activity-groups/99999999').send().expect(404);
});
