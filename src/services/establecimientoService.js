import axios from "axios";

import { Establecimiento } from "../models/establecimiento";

const URL =
  "https://inscripcion.secundario.tierradelfuego.edu.ar/api/Inscription/GetInstitutionReadyToInscription?idlocalidad=1&idacto=";

class EstablecimientoService {
  async allInstance(idActo) {
    const establecimientosJSON = await axios.get(URL + idActo);
    const establecimientos = establecimientosJSON.data.map(
      (establecimientoJSON) => Establecimiento.fromJSON(establecimientoJSON)
    );
    return establecimientos;
  }
}

export const establecimientoService = new EstablecimientoService();
