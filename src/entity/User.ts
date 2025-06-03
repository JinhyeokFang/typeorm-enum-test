import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum UserRole {
    ADMIN,
    EDITOR,
    USER
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole | string;
}
