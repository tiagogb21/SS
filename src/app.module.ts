import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// CONFIGS
import configs from 'src/configs';

// DATABASE
import { DatabaseOptionsModule } from './database/database.options.module';
import { DatabaseOptionsService } from './database/database.options.service';
// MODULES
import { DebuggerModule } from 'src/common/debugger/debugger.module';
// import { HelperModule } from 'src/common/helper/helper.module';
// import { ErrorModule } from 'src/common/error/error.module';
// import { ResponseModule } from 'src/common/response/response.module';
// import { RequestModule } from 'src/common/request/request.module';
// import { AuthModule } from 'src/common/auth/auth.module';
// import { MessageModule } from 'src/common/message/message.module';
// import { LoggerModule } from 'src/common/logger/logger.module';
// import { PaginationModule } from 'src/common/pagination/pagination.module';
// import { SettingModule } from 'src/common/setting/setting.module';
// import { ApiKeyModule } from 'src/common/api-key/api-key.module';
// CONSTANTS
import { DATABASE_CONNECTION_NAME } from './utils/data/constants/database';
import { envValidation } from './utils/libs/Joi';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
      validationSchema: envValidation,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    MongooseModule.forRootAsync({
      connectionName: DATABASE_CONNECTION_NAME,
      imports: [DatabaseOptionsModule],
      inject: [DatabaseOptionsService],
      useFactory: (databaseOptionsService: DatabaseOptionsService) =>
        databaseOptionsService.createOptions(),
    }),
    DebuggerModule.forRoot(),
    // MessageModule,
    // HelperModule,
    // PaginationModule,
    // ErrorModule,
    // ResponseModule,
    // RequestModule,
    // SettingModule,
    // LoggerModule,
    // ApiKeyModule,
    // AuthModule,
  ],
})
export class CommonModule {}
