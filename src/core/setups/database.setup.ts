import { TypeOrmModule } from "@nestjs/typeorm";
import AppDbContext from "src/infrastructure/context/app-db.context";

export default () => (
  TypeOrmModule.forRootAsync({
    useClass: AppDbContext,
  })
);