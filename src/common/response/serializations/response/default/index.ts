import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

import { IMessage } from '../../../../../@types/interfaces/messages/IMessage';

export class ResponseDefaultSerialization<T = Record<string, any>> {
  @ApiProperty({
    name: 'statusCode',
    type: Number,
    nullable: false,
    description: 'return specific status code for every endpoints',
    example: HttpStatus.OK,
  })
  statusCode: number;

  @ApiProperty({
    name: 'message',
    nullable: false,
    description: 'Message base on language',
    oneOf: [
      {
        type: 'string',
        example: 'message endpoint',
      },
      {
        type: 'object',
        example: {
          en: 'This is test endpoint.',
        },
      },
    ],
  })
  message: string | IMessage;

  @ApiProperty({
    name: 'metadata',
    nullable: true,
    description: 'Contain metadata about API',
    type: 'object',
    required: true,
    example: {
      languages: ['en'],
      timestamp: 1660190937231,
      timezone: 'Asia/Jakarta',
      requestId: '40c2f734-7247-472b-bc26-8eff6e669781',
      path: '/api/v1/test/hello',
      version: '1',
      repoVersion: '1.0.0',
    },
  })
  metadata?: Record<string, any>;

  data?: T;
}
