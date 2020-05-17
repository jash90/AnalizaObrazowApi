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
<%= Import %>

@Table({
    tableName: "algorithms"
})
export class Algorithm extends Model<Algorithm> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;
@Unique(true)
@Column(DataType.TEXT)
name: string;
@Column(DataType.TEXT)
parameters: string;

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
