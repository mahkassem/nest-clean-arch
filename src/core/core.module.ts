import { Global, Module } from '@nestjs/common';
import Exports from './exports';
import Providers from './providers';
import Setups from './setups';

@Global()
@Module({
  imports: [
    ...Setups(),
  ],
  providers: [
    ...Providers(),
  ],
  exports: [
    ...Exports(),
  ],
})
export class CoreModule { }
