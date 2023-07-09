const example = {
  name: 'Jorge',
  age: 33,
  childrens: [{ name: 'pepe', age: 21 }],
};

type TypeStorageMethods = {
  storage: Storage;
};

class StorageMethods<T> {
  private data: TypeStorageMethods;

  constructor(data: TypeStorageMethods) {
    this.data = data;
  }

  getKey(name: keyof T) {
    return JSON.parse(this.data.storage.getItem(name as string));
  }

  setKey(name: keyof T, newValue: any, stringuify = true) {
    this.data.storage.setItem(
      name as string,
      stringuify ? JSON.stringify(newValue) : newValue
    );
  }
}

class StorageUtils<T> {
  constructor(
    public session = new StorageMethods<T>({ storage: sessionStorage }),
    public local = new StorageMethods<T>({ storage: localStorage })
  ) {}
}

const storage = new StorageUtils<typeof example>();
storage.session.setKey('childrens', example.childrens);
console.log(storage.session.getKey('childrens'));
