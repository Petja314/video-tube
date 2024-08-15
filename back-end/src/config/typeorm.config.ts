import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const getTypeOrmConfig = async (
	configService: ConfigService
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: 'localhost',
	port: configService.get('PORT'),
	// database: configService.get('DATABASE'),
	// username: configService.get('USERNAME'),
	// password: configService.get('PASSWORD'),
	database: 'rutube-v2',
	username: 'postgres',
	password: '123456',
	autoLoadEntities: true,
	synchronize: true
})
