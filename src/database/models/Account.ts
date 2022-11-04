import { Column, CreatedAt, DataType, Default, Index, Model, Table, UpdatedAt } from "sequelize-typescript";

export interface AccountsAttributes {
  accountType?: number;
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  passwordReset?: boolean;
  phone?: string;
  mobile?: string;
  statusId?: number;
  image?: string;
  active?: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  id?: number;
}

@Table({
  tableName: "accounts",
  timestamps: true,
})
export class Account extends Model<AccountsAttributes, AccountsAttributes> implements AccountsAttributes {
  @Column({
    field: "account_type",
    allowNull: true,
    type: DataType.INTEGER,
  })
    accountType?: number;

  @Default("Mr")
  @Column({
    allowNull: true,
    type: DataType.ENUM("Mr", "Mrs", "Miss", "Ms", "Dr"),
  })
    title?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
    firstName?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
    lastName?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })

    email?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
    password?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
    phone?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
    mobile?: string;

  @Column({
    allowNull: true,
    type: DataType.SMALLINT.UNSIGNED,
  })

    statusId?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
    image?: string;

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
  })
    active?: boolean;

  @Default(false)
  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
  })
    isAdmin?: boolean;

  @CreatedAt
  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
    createdAt?: Date;

  @UpdatedAt
  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
    updatedAt?: Date;

  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  @Index({
    name: "PRIMARY",
    length: 36,
    using: "BTREE",
    unique: true,
  })
    id?: number;
}
