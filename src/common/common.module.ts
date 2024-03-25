import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonRepository } from './common.repository';

@Module({
	providers: [CommonService],
	exports: [CommonService, CommonRepository]
})
export class CommonModule {}
