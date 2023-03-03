import axios from "axios";

import { ActoPublico } from "../models/actoPublico";

const URL =
  "https://inscripcion.secundario.tierradelfuego.edu.ar/api/Inscription/GetActosActivos";

class ActoService {
  async allInstance() {
    const actosJSON = await axios.get(URL);
    //console.log("actosJSON:", actosJSON);
    const actos = actosJSON.data.map((actoJSON) =>
      ActoPublico.fromJSON(actoJSON)
    );
    return actos;
  }
}

export const actoService = new ActoService();
