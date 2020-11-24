import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('mysql://root:testerson123jojo@localhost:3306/pitu_db');

export default sequelize;