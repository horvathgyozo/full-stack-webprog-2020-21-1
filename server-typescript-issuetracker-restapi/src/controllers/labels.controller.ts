import { Router } from 'express';
import { wrap } from '@mikro-orm/core';
import { Label } from '../entities/label';

export const labelsRouter = Router();

labelsRouter

  .use((req, res, next) => {
    req.labelsRepository = req.orm.em.getRepository(Label);
    next();
  })

  // összes lekérdezése
  .get('', async (req, res) => {
    const text = req.query.text || '';
    const labels = await req.labelsRepository!.find({
      text: { $like: `%${text}%` },
    });
    res.send(labels);
  })

  // új létrehozása
  .post('', async (req, res) => {
    const label = new Label();
    const wrappedLabel = wrap(label);
    wrappedLabel.assign(req.body);
    // lementi és beküldi a db-be
    await req.labelsRepository!.persistAndFlush(label);
    res.send(label);
  });
