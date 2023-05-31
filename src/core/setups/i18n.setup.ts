import {
  AcceptLanguageResolver,
  I18nJsonLoader,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from "path";

export default () => (
  I18nModule.forRoot({
    fallbackLanguage: 'en',
    loader: I18nJsonLoader,
    loaderOptions: {
      path: join(__dirname, '..', '..', '/i18n/'),
      watch: true,
    },
    resolvers: [
      { use: QueryResolver, options: ['lang'] },
      AcceptLanguageResolver,
    ],
  })
)
