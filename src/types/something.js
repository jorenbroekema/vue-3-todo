export class Something {
  constructor() {
    const arr = [1, 2, 3];

    const otherArr = [...arr, 4]; // [1,2,3,4]

    const obj = {
      a: 1,
      b: 2,
    };

    const otherObj = {
      ...obj,
      b: 3,
    };

    /**
     * {
     *   a: 1,
     *   b: 3,
     * }
     */
  }

  get computedItem() {
    // Mutatie of filter laagje over 'this.item' als een getter
    // Analogie voor Vue3.js' computedProps
    return {
      ...this.item,
      id: this.item.id++,
    };
  }

  otherMethod() {
    console.log(this.computedItem); // {name: ... , id: ... +1}
  }
}
