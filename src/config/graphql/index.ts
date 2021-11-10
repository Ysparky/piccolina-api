import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';

export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions | Promise<GqlModuleOptions> {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      bodyParserConfig: { limit: '50mb' },
      cors: {
        origin: true,
        credentials: true,
      },
      introspection: true,
      playground: true,
      sortSchema: true,
    };
  }
}
