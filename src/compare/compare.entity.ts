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

    @Column(DataType.BIGINT)
    imageId: number;

    @Column(DataType.BIGINT)
    secondImageId: number;

    @Column(DataType.SMALLINT)
    similarity: number;

    @Column(DataType.BOOLEAN)
    correct: boolean;

    @Column(DataType.BIGINT)
    versionAlgorithmId: number;

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
