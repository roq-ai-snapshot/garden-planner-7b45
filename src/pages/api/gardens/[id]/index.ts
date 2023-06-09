import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { gardenValidationSchema } from 'validationSchema/gardens';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.garden
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getGardenById();
    case 'PUT':
      return updateGardenById();
    case 'DELETE':
      return deleteGardenById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGardenById() {
    const data = await prisma.garden.findFirst(convertQueryToPrismaUtil(req.query, 'garden'));
    return res.status(200).json(data);
  }

  async function updateGardenById() {
    await gardenValidationSchema.validate(req.body);
    const data = await prisma.garden.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteGardenById() {
    const data = await prisma.garden.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
