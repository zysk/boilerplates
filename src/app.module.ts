import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { validateEnv } from './common/env-config';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		TypeOrmModule.forRoot(dataSourceOptions),
		ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
		UserModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
