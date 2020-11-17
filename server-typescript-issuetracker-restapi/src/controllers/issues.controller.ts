import { Router } from 'express';
import { Issue } from '../entities/issue';
import { wrap } from '@mikro-orm/core';
import { authorize } from '../security/authorize';
import { User, UserRole } from '../entities/user';
import { Message } from '../entities/message';

export const issuesRouter = Router();

issuesRouter

  .use((req, res, next) => {
    req.issuesRepository = req.orm.em.getRepository(Issue);
    next();
  })

  // összes lekérdezése
  .get('', async (req, res) => {
    if (req.user!.role === UserRole.Admin) {
      const issues = await req.issuesRepository!.findAll({
        populate: ['labels'],
      });
      res.send(issues);
    } else {
      const issues = await req.issuesRepository!.find({
        user: {
          id: req.user!.id,
        }
      }, {
        populate: ['labels'],
      })
      res.send(issues);
    }
  })

  // egy konkrét lekérdezése
  .get('/:id', async (req, res) => {
    const issue = await req.issuesRepository!.findOne(
      { id: parseInt(req.params.id) },
      {
        populate: ['labels', 'user', 'messages', 'messages.user'],
      },
    );
    if (!issue) {
      return res.sendStatus(404);
    }
    if (req.user!.role !== UserRole.Admin && req.user!.id !== issue.user.id) {
      return res.sendStatus(403);
    }
    res.send(issue);
  })

  // új létrehozása
  .post('', async (req, res) => {
    // Létrehozok egy issue osztályba tartozó objektumot
    const issue = new Issue();

    // Mikroorm-mel adok neki néhány segédmetódust
    const wrappedIssue = wrap(issue);

    // a request összes issueban is megtalálható propertyjét besettelem az objektumba
    wrappedIssue.assign(req.body, { em: req.orm.em });

    // User hozzácsatolása az issuehoz
    issue.user = req.orm.em.getReference(User, req.user!.id);

    // Az assign a merge paramétertől függően vagy csak az új, vagy csak az id-vel
    // rendelkező entitásokat húzza be az entitymanagerbe, szóval az eltérőeket
    // kézzel kell behúznunk
    const labels = issue.labels.getItems();
    if (labels) {
      labels
        .filter((label) => label.id)
        .forEach((label) => req.orm.em.merge(label));
    }

    // lementi és beküldi a db-be
    await req.issuesRepository!.persistAndFlush(issue);

    res.send(issue);
  })
  .put('/:id', async (req, res) => {
    const issue = await req.issuesRepository!.findOne(
      { id: parseInt(req.params.id) },
      {
        populate: ['labels', 'user', 'messages', 'messages.user'],
      },
    );
    if (!issue) {
      return res.sendStatus(404);
    }
    if (req.user!.role !== UserRole.Admin && req.user!.id !== issue.user.id) {
      return res.sendStatus(403);
    }
    wrap(issue).assign({
      title: req.body.title || issue.title,
      description: req.body.description || issue.description,
      place: req.body.place || issue.place,
      labels: req.body.labels || issue.labels,
      status: req.body.status || issue.status,
    }, { em: req.orm.em });
    await req.issuesRepository!.persistAndFlush(issue);
    res.send(issue);
  })
  .delete('/:id', authorize(UserRole.Admin), async (req, res) => {
    const id = req.params.id;
    const deletedCount = await req.issuesRepository?.nativeDelete({ id });
    if (deletedCount) {
      return res.sendStatus(200);
    }
    return res.sendStatus(404);
  })
  .post('/:id/messages', async (req, res) => {
    const issue = await req.issuesRepository!.findOne(
      { id: parseInt(req.params.id) },
      {
        populate: ['labels', 'user', 'messages'],
      },
    );
    if (!issue) {
      return res.sendStatus(404);
    }
    if (req.user!.role !== UserRole.Admin && req.user!.id !== issue.user.id) {
      return res.sendStatus(403);
    }
    const newMessage = new Message();
    wrap(newMessage).assign(req.body);
    newMessage.user = req.orm.em.getReference(User, req.user!.id);;
    issue.messages.add(newMessage);
    await req.issuesRepository!.persistAndFlush(issue);
    res.send(newMessage);
  })
  .get('/:id/messages', async (req, res) => {
    const issue = await req.issuesRepository!.findOne(
      { id: parseInt(req.params.id) },
      {
        populate: ['user', 'messages', 'messages.user'],
      },
    );
    if (!issue) {
      return res.sendStatus(404);
    }
    if (req.user!.role !== UserRole.Admin && req.user!.id !== issue.user.id) {
      return res.sendStatus(403);
    }
    res.send(issue.messages);
  });

