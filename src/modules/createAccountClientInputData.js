import bcrypt from 'bcrypt'

export class UserData {
  constructor(ID,PW) {
    this.ID = ID;
    this._PW = PW;
  }

  set _PW (value) {
    this.PW = bcrypt.hashSync(value, 12);
  }

  get columns() {
    return Object.keys(this).join();
  }
  get values() {
    return Object.values(this).map(element=>`\'${element}\'`).join();
  }
}

// const test = new UserData('root','root');
// console.log(test.values);