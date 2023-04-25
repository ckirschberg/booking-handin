import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookingsModule } from './bookings/bookings.module';
import { ProblemsModule } from './problems/problems.module';
import { AuthModule } from './authentication/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express/multer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TodosModule } from './todos/todos.module';


@Module({
 imports: [
   ConfigModule.forRoot({ isGlobal: true }),
   MulterModule.register({
    dest: './files',
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'files')
  }),
   TypeOrmModule.forRootAsync({
     imports: [ConfigModule],
     useFactory: (configService: ConfigService) => ({
       type: 'postgres',
       host: configService.get('DB_HOST'),
       port: +configService.get<number>('DB_PORT'),
       username: configService.get('DB_USERNAME'),
       password: configService.get('DB_PASSWORD'),
       database: configService.get('DB_NAME'),
       autoLoadEntities: true,
       synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
     }),
     inject: [ConfigService],
   }),
   BookingsModule,
   ProblemsModule,
   TodosModule,
   AuthModule,
 ],
 controllers: [AppController],
 providers: [AppService],
})
export class AppModule {}



