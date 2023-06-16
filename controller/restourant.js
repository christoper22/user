const { restourant, menu } = require('../models');
const fs = require('fs');
const { Op } = require('sequelize');
const readline = require('readline');
const JSONStream = require('JSONStream');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'https://localhost:9200' });

exports.importRestourant = async () => {
  // const data = fs.readFileSync('./restaurants.json');

  const filePath = './restaurants.json';

  const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
  const parser = JSONStream.parse('*');

  stream.pipe(parser);

  parser.on('data', async (object) => {
    // Process each object from the JSON file here
    console.log(object);
    const functionInput = async (data) => {
      const dataRestourant = await restourant.create({
        name: data.name,
        location: data.location,
        balance: data.balance,
      });
      await Promise.all(
        data.menu.map(async (dataMenu) => {
          const dataMenuRestourant = await menu.create({
            id_restourant: dataRestourant.id,
            name: dataMenu.name,
            price: parseFloat(dataMenu.price),
          });
        })
      );
    };
    await functionInput(object);
  });

  parser.on('end', () => {
    // File reading has finished
  });

  parser.on('error', (error) => {
    // Handle any error that occurs during parsing
    console.error(error);
  });
};

exports.getAllRestourant = async (req) => {
  try {
    const dish = req.query.dish === '' ? null : req.query.dish;
    const startPriceDish =
      req.query.startprice === '' ? null : req.query.startprice;
    const endPrice = req.query.lastprice === '' ? null : req.query.lastprice;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = page ? (page - 1) * limit : null;

    const filter = {};
    const filterDish = {};

    if (dish) {
      filterDish.name = { [Op.iLike]: `%${dish}%` };
    }
    if (startPriceDish && endPrice) {
      filterDish.price = { [Op.between]: [startPriceDish, endPrice] };
    }
    const data = await restourant.findAll({
      include: [
        {
          model: menu,
          as: 'menu',
          where: filterDish,
          attributes: [],
        },
      ],
      offset: offset,
      limit: limit,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

exports.elasticSearch = async (req) => {
  try {
    // async function checkClusterHealth() {
    //   try {
    //     const response = client.cluster.health();
    //     console.log('Cluster health:', response.body);
    //   } catch (error) {
    //     console.error('Error checking cluster health:', error);
    //   }
    // }

    // await checkClusterHealth();
    async function connectWithRetry() {
      try {
        await client.ping();
        console.log('Connected to Elasticsearch');
      } catch (error) {
        console.error('Error connecting to Elasticsearch:', error.message);
        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectWithRetry, 5000);
      }
    }
    await connectWithRetry();
  } catch (error) {
    console.log(error);
  }
};
