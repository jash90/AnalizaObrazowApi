import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { ImageModule } from './image/images.module';
import { CompareModule } from './compare/compares.module';
import { AlgorithmModule } from './algorithm/algorithms.module';
import { SimilarityModule } from './similarity/similarities.module';

@Module({
    imports: [UsersModule, SharedModule, AlgorithmModule, ImageModule, CompareModule, SimilarityModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
