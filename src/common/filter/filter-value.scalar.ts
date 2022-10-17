import { GraphQLError, GraphQLScalarType, Kind, ValueNode } from 'graphql';

export type FilterValue = boolean | number | string;

export const FilterValueScalar = new GraphQLScalarType({
  name: 'FilterValue',
  description: 'Custom filter value type',

  parseValue(value: FilterValue): FilterValue {
    return value; // value from the client
  },

  serialize(value: FilterValue): FilterValue {
    return value; // value sent to the client
  },

  parseLiteral(ast: ValueNode): FilterValue {
    if (
      ast.kind === Kind.INT ||
      ast.kind === Kind.FLOAT ||
      ast.kind === Kind.STRING ||
      ast.kind === Kind.BOOLEAN
    ) {
      return ast.value;
    }

    throw new GraphQLError(`
        Type "${ast.kind}" is not a supported filter value type.
    `);
  },
});
