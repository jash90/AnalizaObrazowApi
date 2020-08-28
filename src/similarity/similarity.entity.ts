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

import { Image } from '../image/image.entity';

@Table({
    tableName: "similarities"
})
export class Similarity extends Model<Similarity> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @ForeignKey(() => Image)
    @Column({ type: DataType.BIGINT })
    imageId: number;

    @BelongsTo(() => Image)
    image: Image;

    @ForeignKey(() => Image)
    @Column({ type: DataType.BIGINT })
    secondImageId: number;

    @BelongsTo(() => Image)
    secondImage: Image;

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
