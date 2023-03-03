export class Trabajo {
  constructor() {
    this.descripcion = "";
  }
  static fromJSON(trabajoJSON) {
    const result = Object.assign(new Trabajo(), trabajoJSON);
    return result;
  }
}
