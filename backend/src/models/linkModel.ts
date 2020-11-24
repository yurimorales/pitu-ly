import Sequelize, {Optional, Model} from 'sequelize';
import {Link} from './link';
import database from '../database';

interface ILinkCreationAttributes extends Optional<Link, "id">{}

export interface ILinkModel extends Model<Link, ILinkCreationAttributes>, Link{}

const linkModel = database.define<ILinkModel>('link', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED, // somente numeros inteiros positivos
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    code: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false
    },
    hits: {
        type: Sequelize.INTEGER.UNSIGNED, // somente numeros inteiros positivos
        allowNull: true,
        defaultValue: 0
    }
});

export default linkModel;
