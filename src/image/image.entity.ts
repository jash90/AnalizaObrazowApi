import { Compare } from '../compare/compare.entity';
import { Similarity } from '../similarities/similarity.entity';

import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    ForeignKey,
    HasMany,
    Length,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt
} from "sequelize-typescript";

@Table({
    tableName: "images"
})
export class Image extends Model<Image> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Unique(true)
    @Column(DataType.TEXT)
    filename: string;

    @Unique(true)
    @Column(DataType.TEXT)
    path: string;

    @Column(DataType.INTEGER)
    width: number;

    @Column(DataType.INTEGER)
    height: number;

    @Column(DataType.TEXT)
    location: string;

    @Column(DataType.DATE)
    date_created: Date;

    @HasMany(() => Compare)
    compares: Compare[];

    @HasMany(() => Similarity)
    similarities: Similarity[];

    @CreatedAt
    @Column({ field: "createdAt" })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: "updatedAt" })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: "deletedAt" })
    deletedAt: Date;
}
