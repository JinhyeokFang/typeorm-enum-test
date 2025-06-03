import "reflect-metadata";
import { MySQLDataSource, PostgresDataSource } from "./data-source";
import { User, UserRole } from "./entity/User";
import { DataSource } from "typeorm";

async function testEnumColumn(dataSource: DataSource) {
    try {
        await dataSource.initialize();
        const userRepository = dataSource.getRepository(User);
        const newUser = new User();
        newUser.role = UserRole.USER;
        const savedUser = await userRepository.save(newUser);

        const user = await userRepository.findOneBy({ role: UserRole.USER });
        const user2 = await userRepository.findOneBy({ role: UserRole.USER.toString() });

        console.log(`=============== ${dataSource.options.type} ===============`);
        console.log("savedUser: ", savedUser);
        console.log("user: ", user);
        console.log("user2: ", user2);
    } catch (error) {
        console.error("error: ", error);
    }
}

testEnumColumn(MySQLDataSource);
testEnumColumn(PostgresDataSource);
