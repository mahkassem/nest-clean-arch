import { APP_FILTER } from "@nestjs/core";
import { GlobalExceptionFilter } from "../filters/exceptions/global-exception.filter";
import { I18nResponse } from "../helpers/i18n.helper";
import Validators from "./validator.provider";

export default () => ([
  {
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter,
  },
  ...Validators(),
  I18nResponse,
])