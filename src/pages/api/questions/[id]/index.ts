import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { questionValidationSchema } from 'validationSchema/questions';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.question
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getQuestionById();
    case 'PUT':
      return updateQuestionById();
    case 'DELETE':
      return deleteQuestionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getQuestionById() {
    const data = await prisma.question.findFirst(convertQueryToPrismaUtil(req.query, 'question'));
    return res.status(200).json(data);
  }

  async function updateQuestionById() {
    await questionValidationSchema.validate(req.body);
    const data = await prisma.question.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteQuestionById() {
    const data = await prisma.question.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
