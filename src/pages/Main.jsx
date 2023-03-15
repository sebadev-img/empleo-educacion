import React from "react";
import Navbar from "../components/navbar/Navbar";
import List from "../components/list/List";
import Search from "../components/search/Search";
import Filter from "../components/filter/Filter";

import "./Main.css";

import { actoService } from "../services/actoService";
import { establecimientoService } from "../services/establecimientoService";
import { trabajoService } from "../services/trabajoService";
import { Oferta } from "../models/oferta";
import { useEffect, useState } from "react";

let listaTrabajos = [];
let listaOfertas = [];

function Main() {
  const [actos, setActos] = useState([]);
  const [establecimientos, setEstablecimientos] = useState([]);
  const [hayTrabajos, setHayTrabajos] = useState(false);
  const [lista, setLista] = useState([]);
  const [searchText, setSearchText] = useState("");

  const buscarActos = async () => {
    try {
      const nuevoActo = await actoService.allInstance();
      setActos(nuevoActo);
    } catch (error) {
      console.log(error);
    }
  };

  const buscarEstablecimientos = async () => {
    try {
      const idActo = actos[0].id;
      const nuevoEstablecimiento = await establecimientoService.allInstance(
        idActo
      );
      //const nuevoEstablecimiento = await establecimientoService.allInstance(1045);
      //console.log("establecimientos", nuevoEstablecimiento);
      setEstablecimientos(nuevoEstablecimiento);
    } catch (error) {
      console.log(error);
    }
  };

  const buscarTrabajosPorEstablecimiento = async (
    idEstablecimiento,
    idActo
  ) => {
    //console.log("buscarTrabajos", idEstablecimiento);
    try {
      const nuevosTrabajos = await trabajoService.allInstances(
        idEstablecimiento,
        idActo
      );
      const trabajosEstablecimiento = {
        id: idEstablecimiento,
        trabajos: nuevosTrabajos,
      };
      return trabajosEstablecimiento;
    } catch (error) {
      console.log(error);
    }
  };

  const buscarTodosLosTrabajos = async () => {
    await Promise.all(
      establecimientos.map(async (establecimiento) => {
        const { id: idEstablecimiento } = establecimiento;
        const idActo = actos[0].id;
        const trabajosEstablecimiento = await buscarTrabajosPorEstablecimiento(
          idEstablecimiento,
          idActo
        );
        //const trabajosEstablecimiento = await buscarTrabajosPorEstablecimiento(idEstablecimiento,1045);
        listaTrabajos = [...listaTrabajos, trabajosEstablecimiento];
        const arrUniq = [
          ...new Map(listaTrabajos.map((v) => [v.id, v])).values(),
        ];
        listaTrabajos = arrUniq;
        //console.log("lista final", listaTrabajos);
        return trabajosEstablecimiento;
      })
    );
    //console.log("busqueda finalizada");
    setHayTrabajos(true);
  };

  const armarListaOferta = () => {
    listaOfertas = [];
    listaTrabajos.map((establecimiento) => {
      establecimiento.trabajos.map((trabajo) => {
        //console.log("armarListaOferta", trabajo);
        const nuevaOferta = Oferta.fromTrabajo(trabajo);
        listaOfertas.push(nuevaOferta);
      });
    });
  };

  useEffect(() => {
    buscarActos();
    //console.log("actos:", actos);
    //buscarEstablecimientos();
  }, []);

  useEffect(() => {
    console.log("actos", actos);
    buscarEstablecimientos();
  }, [actos]);

  useEffect(() => {
    setHayTrabajos(false);
    buscarTodosLosTrabajos();
  }, [establecimientos]);

  useEffect(() => {
    console.log("entra al useeeee");
    armarListaOferta();
    setLista(listaOfertas);
  }, [hayTrabajos]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      console.log("hola");
      // if search vacio
      let listaFiltrada;
      if (searchText) {
        listaFiltrada = listaOfertas.filter((trabajo) => {
          const descripcion = trabajo.descripcion.toLowerCase();
          const texto = searchText.toLowerCase();
          if (descripcion.includes(texto)) {
            return trabajo;
          }
          return false;
        });
      } else {
        listaFiltrada = listaOfertas;
      }
      setLista(listaFiltrada);
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [searchText]);

  console.log("main render");

  return (
    <div>
      <Navbar></Navbar>

      {hayTrabajos ? (
        <div className="mainpage-container">
          <div className="main-left">
            <Filter></Filter>
          </div>
          <div className="main-right">
            <Search setSearchText={setSearchText}></Search>
            <List listaTrabajos={lista}></List>
          </div>
        </div>
      ) : (
        <p>no hay trabajos</p>
      )}
    </div>
  );
}

export default Main;
