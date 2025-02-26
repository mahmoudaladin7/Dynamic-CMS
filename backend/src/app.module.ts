import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PagesController } from "./pages/pages.controller";
import { PageConfig } from "./page-config.model";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD") || undefined, // Handle empty password
        database: configService.get<string>("DB_NAME"),
        entities: [PageConfig],
        synchronize: true, // Automatically sync database schema (for development only)
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([PageConfig]), // Register the repository
  ],
  controllers: [PagesController],
  providers: [],
})
export class AppModule {}
