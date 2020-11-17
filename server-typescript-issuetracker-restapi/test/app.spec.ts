import { app } from '../src/server';
import supertest from 'supertest';

describe('Issue Tracker', () => {
  const user = { username: 'tibi', password: 'tibi' };

  let requestHandle: supertest.SuperTest<supertest.Test>;

  beforeEach(() => {
    requestHandle = supertest(app);
  });

  describe('Authentication', () => {
    it('should register', async () => {
      await requestHandle.post('/user/register').send(user).expect(200);
    });

    it('should fail on same user registration', async () => {
      await requestHandle.post('/user/register').send(user).expect(409);
    });

    it('should login with registered user', async () => {
      await requestHandle.post('/user/login').send(user).expect(200);
    });
  });

  describe('Issue Controller', () => {
    let token: string;

    let time: Date;
    let createdIssue: object;
    beforeAll(() => {
      time = new Date();
      jest.useFakeTimers('modern');
      jest.setSystemTime(time);
      createdIssue = {
        id: 1,
        status: 'NEW',
        title: 'Rossz oktatói gép',
        description: 'Nem kapcsol be',
        place: '2-202',
        createdAt: time.toISOString(),
        modifiedAt: time.toISOString(),
        user: 3,
        labels: [],
      };
    });
    afterAll(() => {
      jest.useRealTimers();
    });

    beforeEach(async () => {
      const loginResponse = await requestHandle.post('/user/login').send(user);
      token = `Bearer ${loginResponse.text}`;
    });

    describe('/issues', () => {
      it('should not list when user is not provided', async () => {
        await requestHandle.get('/issues').expect(401);
      });

      it('should return empty array', async () => {
        await requestHandle
          .get('/issues')
          .set('Authorization', token)
          .expect(200)
          .expect([]);
      });

      it('should create an issue', async () => {
        await requestHandle
          .post('/issues')
          .set('Authorization', token)
          .send({
            title: 'Rossz oktatói gép',
            description: 'Nem kapcsol be',
            place: '2-202',
          })
          .expect(200)
          .expect({
            ...createdIssue,
            messages: [],
          });
      });

      it('should return the newly created issue in an array for the user', async () => {
        await requestHandle
          .get('/issues')
          .set('Authorization', token)
          .expect(200)
          .expect([createdIssue]);
      });

      it('should not return the issue for another normal user', async () => {
        const loginResponse = await requestHandle
          .post('/user/login')
          .send({ username: 'papi', password: 'papi' });
        const otherToken = `Bearer ${loginResponse.text}`;
        await requestHandle
          .get('/issues')
          .set('Authorization', otherToken)
          .expect(200)
          .expect([]);
      });

      it('should return the issue for an admin', async () => {
        const loginResponse = await requestHandle
          .post('/user/login')
          .send({ username: 'admin', password: 'admin' });
        const otherToken = `Bearer ${loginResponse.text}`;
        await requestHandle
          .get('/issues')
          .set('Authorization', otherToken)
          .expect(200)
          .expect([createdIssue]);
      });
    });

    describe('/issues/:id', () => {
      it('should not return anything when user is not provided', async () => {
        await requestHandle.get('/issues/1').expect(401);
      });

      it('should return the requested issue', async () => {
        await requestHandle
          .get('/issues/1')
          .set('Authorization', token)
          .expect(200)
          .expect((res) => {
            const userId = res.body.user.id;
            res.body.user = userId;
            expect(res.body).toEqual({ ...createdIssue, messages: [] });
          });
      });

      it('should return 404 when the issue does not exist', async () => {
        await requestHandle
          .get('/issues/10')
          .set('Authorization', token)
          .expect(404);
      });
    });

    describe('/issues/:id/messages', () => {
      it('should return the newly created message', async () => {
        await requestHandle
          .post('/issues/1/messages')
          .set('Authorization', token)
          .send({
            text: 'cica',
          })
          .expect(200)
          .expect((res) => {
            const userId = res.body.user.id;
            res.body.user = userId;
            expect(res.body).toEqual({
              id: 1,
              text: 'cica',
              createdAt: time.toISOString(),
              modifiedAt: time.toISOString(),
              user: 3,
              issue: 1,
            });
          });
      });
    });

    describe('/labels', () => {
      it('should return the newly created label', async () => {
        await requestHandle
          .post('/labels')
          .set('Authorization', token)
          .send({
            text: 'cica',
          })
          .expect(200)
          .expect({
            id: 1,
            text: 'cica',
            issues: [],
          });
      });

      it('should return all the labels', async () => {
        await requestHandle
          .get('/labels')
          .set('Authorization', token)
          .expect(200)
          .expect([{
            id: 1,
            text: 'cica',
          }]);
      });

      it('should query the labels by text', async () => {
        await requestHandle
          .get('/labels?text=alma')
          .set('Authorization', token)
          .expect(200)
          .expect([]);
      });

      it('should add the label to the issue', async () => {
        await requestHandle
          .put('/issues/1')
          .set('Authorization', token)
          .send({
            labels: [1]
          })
          .expect(200);
        await requestHandle
          .get('/issues/1')
          .set('Authorization', token)
          .expect(res => {
            expect(res.body.labels).toEqual([{
              id: 1,
              text: 'cica',
            }])
          });
      });
    });
  });
});
