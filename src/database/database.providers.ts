import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from './../shared/config/config.service';
import { Similarity } from '../similarity/similarity.entity';
import { Compare } from '../compare/compare.entity';
import { Image } from '../image/image.entity';
import { Algorithm } from '../algorithm/algorithm.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([Algorithm, Image, Compare, Similarity]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
