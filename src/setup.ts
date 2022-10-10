import { INestApplication } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

export function setUp(app: INestApplication) {
  setupPrisma(app);
}

function setupPrisma(app: INestApplication) {
  const prismaService: DatabaseService = app.get(DatabaseService);
  prismaService.enableShutdownHooks(app);
}
