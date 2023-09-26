import { DataTypes } from 'sequelize';
import { seq } from '../db';

export const Task = seq.define('Task', {
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('TODO', 'INPROGRESS', 'DONE'),
        defaultValue: 'TODO',
    }
});