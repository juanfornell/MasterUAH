# Actividad Módulo 4 - PEC 3  

## Desarrollo de una DApp para creación de partes en accidentes   

El objetivo de esta DApp es permitir al usuario crear partes en los que se registren los datos relacionados con cualquier siniestro sucedido entre dos vehículos.

Los requisitos para poder compilar y ejecutar la DApp son los siguientes:

```
solidity 0.5.0
truffle 5.0.6
ganache-cli 6.1.8
npm 11.10.1
```

En primer lugar, se ha desarrollado un smart contract para la gestión de los partes. A través de un mapping, tenemos las address de los creadores de los partes, que a su vez contienen los datos asociados en estructuras definidas de la siguiente manera:

```
struct Parte {
        address usuarioA;
        address usuarioB;
        string matriculaA;
        string matriculaB;
        string dia;
        string lugar;
    }
```

La funcionalidad principal del smart contract es la creación de partes, para la cual se ha desarrollado la función `crearParte`, que creará un parte asociado a la dirección que ejecuta la transacción con los datos introducidos. Posteriormente, este parte se almacena en la blockchain y permanece asociado a su creador con el mapping indicado anteriormente.

Existe una función para aceptar un parte creado por el dueño del otro vehículo implicado, `aceptarParte`, la cual se abordaría en un segundo desarrollo en el que se permitiría buscar por la matrícula si hay algún parte creado que afecte a otro vehículo para que su dueño lo pueda aceptar en caso de conformidad.

Por último, existen una serie de funciones para recuperar información de un parte relacionado con una address, la de su creador, concreta.

Para la correcta ejecución de la aplicación, se ha realizado el lanzamiento de `ganache-cli` con las siguientes opciones:

```
ganache-cli --gasLimit=0x1fffffffffffff --allowUnlimitedContractSize -e 1000000000
```

Estas opciones fuerzan que los smart contracts tengan más espacio disponible, aumentar el límite de gas y que las cuentas que se pueden utilizar en ganache tengan más ethers asociados.

**Nota**: Esta solución es debido a que con la versión 5 de truffle, al desplegar los contratos en ganache se observaba el *error out of gas*. [Link](https://ethereum.stackexchange.com/questions/64557/truffle-v5-runs-out-of-gas-but-truffle-v4-deploys-the-contract)

Para la parte de la interfaz, se tomó como punto de partida el proyecto webpack de truffle: <https://github.com/trufflesuite/truffle-init-webpack>


### Aspectos realizados con la práctica

1. Ejecución de la aplicación en un servidor local.

Para ejecutar la aplicación, en primer lugar iniciamos la blockchain con ganache.

![Captura ganache](./images/ganache.png?raw=true)  

En segundo lugar, a través de la consola de truffle compilamos y migramos los smart contratcs a la blockchain de ganache.

```
truffle(develop)> migrate --network ganache

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'ganache'
> Network id:      1551636741771
> Block gas limit: 9007199254740991


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xbf79c9f14aaff3da5c19340407d88da93a32ef0b750a753b1be3c665b79e6851
   > Blocks: 0            Seconds: 0
   > contract address:    0x579a33B08bB374f564C819FACc7d5AFcBFb897c7
   > account:             0x1B5159A7A04D4617FFc53E3A0C231D2C3750C2aC
   > balance:             999999999.999999999999715156
   > gas used:            284844
   > gas price:           0.000000001 gwei
   > value sent:          0 ETH
   > total cost:          0.000000000000284844 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000000000000284844 ETH


2_deploy_contracts.js
=====================

   Deploying 'GestionPartes'
   -------------------------
   > transaction hash:    0xbd539c1fbb6fc30ef359e7a8bb8027f5ba2fd09f7026922228c8d38e34038a99
   > Blocks: 0            Seconds: 0
   > contract address:    0x735063a17864bbC8E8a1787e6dd7C6ff7a7f6302
   > account:             0x1B5159A7A04D4617FFc53E3A0C231D2C3750C2aC
   > balance:             999999999.999999999998362585
   > gas used:            1310537
   > gas price:           0.000000001 gwei
   > value sent:          0 ETH
   > total cost:          0.000000000001310537 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000000000001310537 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.000000000001595381 ETH
```

Por último, ejecutamos la aplicación con npm en *http://localhost:8080/*.

`npm run dev`

2. Visitar desde el navegador la URL correspondiente y que se realice una carga correcta de la aplicación.

Ejecutando desde el navegador la dirección `http://localhost:8080/` podemos acceder a nuestra aplicación en local.
 
![Captura interfaz](./images/interfaz.png?raw=true)  

3. Interactuar con la aplicación.

A través de la aplicación web, podemos insertar los datos del parte en los formularios y registrar dicho parte pulsando el botónde *Crear nuevo parte*.

4. Mostrar el address actual.  

En la parte superior de la pantalla podemos ver el address de la cuenta actual con la que hemos accedido vía Metamask.

![Captura address](./images/address.png?raw=true)  

5. Refrescar automáticamente la web en caso de cambiar de address (MetaMask).
 		
Cuando se cambia de cuenta a través de Metamask, la dirección con la que estamos activos se modifica en la aplicación.

6. Firmar transacciones usando MetaMask.

Una vez hemos introducido los datos, podemos proceder a crear el parte a través de una transacción firmada con Metamask.

![Captura firmar transacción](./images/firmar_tx.png?raw=true)  

7. Guiar al usuario final que usa la aplicación sobre lo que está sucediendo en la aplicación.

Tras aceptar la transacción, si todo ha ido bien se informa al usuario en la parte inferior de que el parte se ha creado correctamente.

![Captura informar usuario](./images/mensaje_user.png?raw=true)  

Si refrescamos el navegador, vemos que ahora aparecen los datos del parte que se ha creado con el address con el que estamos activos.

![Captura parte creado](./images/parte_creado.png?raw=true)  

8. Uso de herencia.

Para poder utilizar la función de parada de emergencia, es necesario utilizar el modificador *onlyOwner* proporcionado por Open Zeppelin. Para ello, hemos incluido el smart contract Owned.sol y lo hemos importado en nuestro smart contract, que hereda de él.


10. Parada de emergencia

Para poder parar la funcionalidad de crear nuevos partes, hemos incluido la variable de parada y el modificador correspondiente:

```
bool private parada = false;

    modifier noParada {
        if(!parada) 
        _;
    }
```

La función para poder pararlo es la siguiente. Incluye el modificador OnlyOwner, heredado del contrato Owned.sol para que solo pueda ser parada por el dueño de la dirección en la que está desplegado.

```
function paradaEmergencia() public onlyOwner {
        parada = !parada;
    }
```

11. Comentarios de los smart contracts siguiendo la guía de solidity.

El smart contract se ha comentado siguiendo la siguiente guía: <https://solidity.readthedocs.io/en/v0.4.25/layout-of-source-files.html#comments>

12. Justifique los test creados y explique para cada uno la función que realizan.

Los test necesarios para comprobar la creación de partes y la recuperación de información de los mismos está incluida en el fichero *gestionpartes.js*. En dicho fichero de test, se crea un parte con unos valores concretos y se comprueba, utilizando las funciones get, que la información del parte se ha creado correctamente.

13. Todos los test se ejecutan satisfactoriamente.

Para lanzar los tests y comprobar que se ejecutan correctamente, utilizamos `truffle test`.

![Captura Tests](./images/tests.png?raw=true)  

14. Realice comentarios sobre el código de los tests.

Los comentarios del fichero *gestionpartes.js* permiten comprobar la funcionalidad que se está validando.