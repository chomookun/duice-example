import { Module } from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
import { ApiService } from './api/api.service';
import { ApiController } from './api/api.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'public'),
        serveRoot: '/'
      }
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'example/plain-example'),
      serveRoot: '/plain-example',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'example/react-example/build'),
      serveRoot: '/react-example',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'example/vue-example/dist'),
      serveRoot: '/vue-example',
    })
  ],
  providers: [ApiService],
  controllers: [ApiController],
})

export class AppModule {}
