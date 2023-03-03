export class ActoPublico {
  constructor() {
    this.numero = "";
    this.descripcion = "";
    this.inicio = "";
    this.fin = "";
    this.id = 0;
  }
  static fromJSON(actoJSON) {
    const result = Object.assign(new ActoPublico(), actoJSON);
    return result;
  }
}
