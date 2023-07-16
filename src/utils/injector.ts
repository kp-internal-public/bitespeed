import * as _ from "lodash";

// A simple service locator for initializing & retrieving dependencies.
export default class Injector {
  private static map: Record<any, any> = {};

  static get<T extends object>(name: string, create: () => T): T {
    let value = this.map[name];
    if (!_.isNil(value)) return value as T;
    value = create();
    this.inject(value, name);
    return value;
  }

  private static inject<T extends object>(
    instance: T,
    name: string = instance.constructor.name
  ) {
    this.map[name] = instance;
  }
}
