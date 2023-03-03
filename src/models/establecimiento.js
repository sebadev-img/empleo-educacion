export class Establecimiento {
  constructor() {
    this.id = 0;
    this.descripcion = "";
    this.localidadId = "";
  }
  static fromJSON(establecimientoJSON) {
    const result = Object.assign(new Establecimiento(), establecimientoJSON);
    return result;
  }
}
