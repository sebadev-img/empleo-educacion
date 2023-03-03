import axios from "axios";
import { Trabajo } from "../models/trabajo";

const URL =
  "https://inscripcion.secundario.tierradelfuego.edu.ar/api/Inscription/GetPublicOfficesIns?";

class TrabajoService {
  async allInstances(idInstitucion, idActo) {
    const trabajosJSON = await axios.get(
      URL + `idinstitution=${idInstitucion}&idacto=${idActo}`
    );
    const trabajos = trabajosJSON.data.map((trabajoJSON) =>
      Trabajo.fromJSON(trabajoJSON)
    );
    return trabajos;
  }
}

export const trabajoService = new TrabajoService();
