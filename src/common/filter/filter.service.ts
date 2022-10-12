import { Injectable } from '@nestjs/common';
import { FilterValueInput } from './filter.input';
import { ScalarType } from './scalar-type';

@Injectable()
export class FilterService {
  parse(input: FilterValueInput): string | number | boolean {
    switch (input.type) {
      case ScalarType.ID: {
        return input.value;
      }

      case ScalarType.Int: {
        return Number(input.value);
      }

      case ScalarType.Float: {
        return Number(input.value);
      }

      case ScalarType.String: {
        return input.value;
      }

      case ScalarType.Boolean: {
        return input.value === 'true' || false;
      }

      default: {
        throw new Error(`Filter parse error: unknown ScalarType ${input.type}`);
      }
    }
  }
}
