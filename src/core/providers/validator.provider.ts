import { EntityRelatedValidator } from "../validators/entity-related.validator";
import { RecordExists } from "../validators/record-exists.validator";
import { RecordNotExists } from "../validators/record-not-exists.validator";
import { IsUnique } from "../validators/unique-constraints.validator";

export default () => ([
  IsUnique,
  RecordNotExists,
  RecordExists,
  EntityRelatedValidator,
])