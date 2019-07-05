import { ConfigModule, ConfigService } from 'nestjs-config';
import { ProductsModule } from './products/products.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('database.mongo_uri'),
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
