import { registerEnumType } from '@nestjs/graphql';

export enum ScalarType {
  ID = 'ID',
  Int = 'Int',
  Float = 'Float',
  String = 'String',
  Boolean = 'Boolean',
}

registerEnumType(ScalarType, { name: 'ScalarType' });
