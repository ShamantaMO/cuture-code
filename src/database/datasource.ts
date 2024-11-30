import 'dotenv/config'; 
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres', 
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, 
  logging: true,
  entities: [__dirname + '../entities/*.entity.{js,ts}'], 
  migrations: [__dirname + '/migrations/*.{js,ts}'],   
});