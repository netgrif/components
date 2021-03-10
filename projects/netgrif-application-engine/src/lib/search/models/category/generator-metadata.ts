import {Categories} from './categories';

/**
 * Holds serializable information necessary for recreation of any {@link Category} instance in any internal state.
 *
 * Is used to persist search GUI state.
 */
export interface CategoryGeneratorMetadata {
    category: Categories | string;
    configuration: CategoryMetadataConfiguration;
    values: Array<unknown>;
}

/**
 * The keys are some configuration options that make sense to the {@link Category} instance that generated
 * the {@link CategoryGeneratorMetadata} object.
 *
 * The values are some serializable data, that the Category needs to restore its state.
 */
export interface CategoryMetadataConfiguration {
    [k: string]: unknown;
}

/**
 * The two nested arrays represent a predicate tree with 3 levels. The root node of the tree is a predicate consisting of a conjunction
 * (AND) of its subtrees.
 *
 * The single array represents a predicate tree with 2 levels. The root node of the tree is a predicate consisting of a disjunction (OR) of
 * its subtrees.
 *
 * The {@link CategoryGeneratorMetadata} represents a predicate tree with 1 level - a leaf node.
 */
export type GeneratorMetadata = Array<Array<CategoryGeneratorMetadata>> | Array<CategoryGeneratorMetadata> | CategoryGeneratorMetadata;
