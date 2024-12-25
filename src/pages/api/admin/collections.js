const {
  findAll,
  create,
} = require('../../../../server/services/collectionService');
const { moveTemp } = require('../../../../server/services/fileService');

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const collections = await findAll();
        res.status(200).json(collections);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching collections' });
      }
      break;

    case 'POST':
      try {
        const { name, urlKey, description, image } = req.body;
        const imageId = await moveTemp(image, 'storage/collections');
        const collection = await create({
          name,
          urlKey,
          description,
          image: imageId,
        });
        res.status(201).json(collection);
      } catch (error) {
        res
          .status(500)
          .json({ message: 'Error creating collection: ' + error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
