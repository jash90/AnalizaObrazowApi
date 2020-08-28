import { Algorithm } from '../algorithm/algorithm.entity';
import { Image } from '../image/image.entity';
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
    tableName: "compares"
})
export class Compare extends Model<Compare> {
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

    @Column(DataType.DECIMAL)
    similarity: number;

    @Column(DataType.BOOLEAN)
    correct: boolean;

    @ForeignKey(() => Algorithm)
    @Column({ type: DataType.BIGINT })
    versionAlgorithmId: number;

    @BelongsTo(() => Algorithm)
    algorithm: Algorithm;

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
