//pragma solidity ^0.4.17;

import "./Owned.sol";

/** @title Gestion de Partes. */
contract GestionPartes is Owned {
  
    struct Parte {
        address usuarioA;
        address usuarioB;
        string matriculaA;
        string matriculaB;
        string dia;
        string lugar;
    }
  
    mapping(address => Parte) public listaPartes;
  
    address[] direccionesPartes;

    bool private parada = false;

    modifier noParada {
        if(!parada) 
        _;
    }

    constructor() public {
        
    }

    /** @dev Crea un nuevo parte asociado a la dirección que ejecuta la tx.
      * @param _dia Dia del siniestro.
      * @param _lugar Lugar del siniestro.
      * @param _matriculaA Matricula del vehiculo del creador del parte.
      * @param _matriculaB Matricula del vehiculo implicado en el siniestro.
      */
    function crearParte(
        string memory _dia, 
        string memory _lugar, 
        string memory _matriculaA, 
        string memory _matriculaB) public noParada {

        Parte storage nuevoParte = listaPartes[msg.sender];
    
        nuevoParte.usuarioA = msg.sender;
        nuevoParte.usuarioB = address(0);
        nuevoParte.dia = _dia;
        nuevoParte.lugar = _lugar;
        nuevoParte.matriculaA = _matriculaA;
        nuevoParte.matriculaB = _matriculaB;
    
        direccionesPartes.push(msg.sender);
    }
  
    /** @dev Acepta un parte ya creado por el dueño del vehiculo implicado.
      * @param _creador Address del creador del parte.
      * @param _aceptante Adrress del aceptante del parte.
      */
    function aceptarParte(address _creador, address _aceptante) public {
        listaPartes[_creador].usuarioB = _aceptante;
    }

    /** @dev Devuelve el dia de un parte asociado a la dirección
      * @param _creador Address del creador del parte.
      * @return dia del parte
      */
    function getDia(address _creador) public view returns (string memory) {
        return listaPartes[_creador].dia;
    }

    /** @dev Devuelve el lugar de un parte asociado a la dirección
      * @param _creador Address del creador del parte.
      * @return lugar del parte
      */
    function getLugar(address _creador) public view returns (string memory) {
        return listaPartes[_creador].lugar;
    }

    /** @dev Devuelve la matricula del creador de un parte asociado a la dirección
      * @param _creador Address del creador del parte.
      * @return matriculaA del parte
      */
    function getMatriculaA(address _creador) public view returns (string memory) {
        return listaPartes[_creador].matriculaA;
    }

    /** @dev Devuelve la matricula del otro vehiculo del parte asociado a la dirección
      * @param _creador Address del creador del parte.
      * @return matriculaB del parte
      */
    function getMatriculaB(address _creador) public view returns (string memory) {
        return listaPartes[_creador].matriculaB;
    }

    /** @dev Actualiza la variable responsable de parar funcionalidades en el smart contract
      */
    function paradaEmergencia() public onlyOwner {
        parada = !parada;
    }
}