import {InjectionToken, Type} from '@angular/core';
import {AbstractGroupNavigationComponentResolverComponent
} from '../group-navigation-component-resolver/abstract-group-navigation-component-resolver.component';

/**
 * Holds component for dynamic routing resolution of group navigation component resolver component by the {@link RoutingBuilderService}.
 */
export const NAE_GROUP_NAVIGATION_COMPONENT_RESOLVER_COMPONENT
    = new InjectionToken<Type<AbstractGroupNavigationComponentResolverComponent>>('NaeGroupNavigationComponentResolverComponent');
