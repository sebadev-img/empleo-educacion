export class Oferta {
  constructor() {
    this.descripcion = "";
    this.nombreMateria = "";
    this.anio = "";
    this.division = "";
    this.codigo = "";
    this.horas = "";
    this.horario = "";
    this.revista = "";
    this.numeroLlamado = 0;
    this.turno = "";
    this.institucion = "";
    this.localidad = 0;
  }
  static fromTrabajo(trabajo) {
    const { anio, codigo, division, revista, numeroLLamado } = trabajo;
    const materia = trabajo.descripcion;
    const horas = trabajo.hCatedras;
    const horario = trabajo.horas;
    const turno = trabajo.turno.descripcion;
    const institucion = trabajo.institucion.descripcion;
    const localidad = trabajo.institucion.localidadId;
    const oferta = {
      descripcion: `${anio} ${division} - ${materia} - ${horas} - ${codigo}`,
      nombreMateria: materia,
      anio: anio,
      division: division,
      codigo: codigo,
      horas: horas,
      horario: horario,
      revista: revista,
      numeroLlamado: numeroLLamado,
      turno: turno,
      institucion: institucion,
      localidad: localidad,
    };
    const nuevaOferta = Object.assign(new Oferta(), oferta);
    return nuevaOferta;
  }
}
