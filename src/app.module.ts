import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { ImageModule } from './image/images.module';
import { CompareModule } from './compare/compares.module';
import { Similarity } from './similarity/similarity.entity';

@Module({
    imports: [UsersModule, SharedModule, ImageModule, CompareModule, Similarity],
    controllers: [],
    providers: [],
})
export class AppModule { }
