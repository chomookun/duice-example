import { Module } from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
import { ApiService } from './api/api.service';
import { ApiController } from './api/api.controller';

@Module({
  imports: [
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'public'),
      })
  ],
  providers: [ApiService],
  controllers: [ApiController],
})
export class AppModule {}
