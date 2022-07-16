export class NSDataType {
  constructor(id) {
    this.id = id || window.crypto.randomUUID();
  }
}

export class NSDataCollection {
  constructor(dataType) {
    if (dataType == null) throw new TypeError(`Invalid or missing dataType.`);

    this.dataType = dataType;
    this.array = [];
  }

  _find(id) {
    for (let i = 0; i < this.array.length; i++) {
      const item = this.array[i];
      if (item.id === id) {
        return {
          item: item,
          index: i
        };
      }
    }

    return null;
  }

  add(...opts) {
    const item = new this.dataType(...opts);
    this.array.push(item);
  }

  get(id) {
    const found = this._find(id);

    if (found) return found.item;
  }

  remove(id) {
    const found = this._find(id);

    if (found) {
      this.array.splice(found.index, 1);
      return true;
    }
    return false;
  }

  toJSON() {
    const ids = [];
    for (const item of this.array) {
      ids.push(item.id);
    }

    return ids;
  }
}