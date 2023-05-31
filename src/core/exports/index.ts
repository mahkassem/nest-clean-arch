import { I18nResponse } from "../helpers/i18n.helper";
import Validators from "../providers/validator.provider";

export default () => ([
  ...Validators(),
  I18nResponse,
])