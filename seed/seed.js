const sequelize = require('../config/connection');
const {User, Project} = require('../models')

const userSeed = require('./userSeed.json');
const projectSeed = require('./projectSeed.json');

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    const users = await User.bulkCreate(userSeed, {
        individualHooks: true,
        returning: true,
    });

    for (const project of projectSeed) {
        await Project.create({
            ...project,
            user_id: users[Math.floor(Math.random() * users.length)].id
        })
    };

    process.exit(0);
};

seedDatabase();