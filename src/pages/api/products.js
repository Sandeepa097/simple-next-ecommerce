import { Op } from 'sequelize';

const { findAll } = require('../../../server/services/productService');

const getSequelizeOptions = (query) => {
  let options = {};

  if (query.search) {
    options = {
      ...options,
      where: {
        name: { [Op.like]: `%${searchQuery}%` },
      },
    };
  }

  if (query.latest) {
    options = {
      ...options,
      order: [...(options.order || []), ['createdAt', 'DESC']],
    };
  }

  if (query.limit) {
    options = {
      ...options,
      limit: Number(query.limit),
    };
  }

  if (query.offset) {
    options = {
      ...options,
      offset: query.offset,
    };
  }

  return options;
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const options = getSequelizeOptions(req.query);
        const products = await findAll({
          ...options,
        });
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
