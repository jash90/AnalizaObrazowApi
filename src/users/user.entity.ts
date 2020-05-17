import { Column, CreatedAt, DataType, DeletedAt, IsEmail, Model, Table, Unique, UpdatedAt, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Gender } from '../shared/enum/enums';

@Table({
    tableName: 'user',
})
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: string;

    @Unique
    @IsEmail
    @Column
    email: string;

    @Column
    password: string;

    @Column({ field: 'first_name' })
    firstname: string;

    @Column({ field: 'last_name' })
    lastname: string;

    @Column({ type: DataType.ENUM(Gender.female, Gender.male) })
    gender: Gender;

    @Column(DataType.DATEONLY)
    birthday: string;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}
