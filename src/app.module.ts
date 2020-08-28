import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ImageModule } from './image/images.module';
import { CompareModule } from './compare/compares.module';
import { AlgorithmModule } from './algorithm/algorithms.module';
import { SimilarityModule } from './similarity/similarities.module';

@Module({
    imports: [SharedModule, AlgorithmModule, ImageModule, CompareModule, SimilarityModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
