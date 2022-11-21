import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { ActorsModule } from './actors/actors.module';
import { DirectorsModule } from './directors/directors.module';
import { GenresModule } from './genres/genres.module';
import { ReviewersModule } from './reviewers/reviewers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 8001,
      username: 'root',
      password: 'erik2202',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    MoviesModule,
    ActorsModule,
    DirectorsModule,
    GenresModule,
    ReviewersModule,
  ],
})
export class AppModule {}
