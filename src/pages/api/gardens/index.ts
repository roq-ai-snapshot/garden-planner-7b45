import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { gardenValidationSchema } from 'validationSchema/gardens';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getGardens();
    case 'POST':
      return createGarden();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGardens() {
    const data = await prisma.garden
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'garden'));
    return res.status(200).json(data);
  }

  async function createGarden() {
    await gardenValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.plant?.length > 0) {
      const create_plant = body.plant;
      body.plant = {
        create: create_plant,
      };
    } else {
      delete body.plant;
    }
    const data = await prisma.garden.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
