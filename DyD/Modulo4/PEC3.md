# PEC 3

Para la PEC 3 correspondiente al Módulo 4, se ha llevado a cabo una DApp a través de la cual se puede votar. Para ello, se ha desarrollado el smart contract [Voting](./voting/contracts/Voting.sol), en el que se incluye la estructura de datos para almacenar la información referente a los candidatos:

```
struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
```

Dicho smart contract incluye también las funciones necesarias para añadir candidatos y votar:

```
function addCandidate (string _name) private 

function vote (uint _candidateId) whenNotPaused public 
```

Se ha hecho uso de la librería de Open Zeppelin [Safe Math](https://openzeppelin.org/api/docs/math_SafeMath.html) y [Pausable](https://openzeppelin.org/api/docs/lifecycle_Pausable.html). La primera de ella es utilizada para que las sumas al añadir tanto candidatos como votos a los mismos se realice de forma segura. La segunda, se utiliza para que en caso de emergencia, el dueño del contrato pueda realizar una parada de emergencia. En tal caso, no se podría seguir votando ya que esta función hace uso del modificador whenNotPaused.

La DApp está lista para ser ejecutada en local con Ganache siendo ejecutado en el puerto 8545 y la interacción con la DApp se realiza a través del navegador utilizando para ello la extensión MetaMask.


Una vez hemos ejecutado Ganache, publicamos nuestra DApp en la blockchain.

```
truffle migrate --reset
```

A continuación, ejecutamos nuestra DApp con el siguiente comando. Se nos abrirá la interfaz en el navegador.

```
npm run dev
```

![Captura Dapp inicio](./images/inicio.png?raw=true)  

Si tenemos MetaMask configurado para estar conectado a la blockchain en local de Ganache, vemos que nos aparece la dirección asociada a la cuenta que tengamos.

Para votar, seleccionamos en el desplegable a uno de los candidatos y pulsamos el botón Vote. Se nos abrirá un cuadro de diálogo de MetaMask para confirmar la transacción.

![Captura Voto](./images/voting.png?raw=true)  

Una vez aceptada, vemos que el número de votos del candidato seleccionado se ha incrementado y que ya no aparece el botón para votar debido a que solo podemos votar una vez desde esta direccióm.

![Captura Votación emitida](./images/voted.png?raw=true)  

Si cambiamos de cuenta con MetaMask, vemos que la interfaz se refresca de forma automática mostrando nuestra nueva dirección y permitiéndonos votar nuevamente a uno de los candidatos.

![Captura Cambio de Dirección](./images/new-vote.png?raw=true)  

Para garantizar que el contrato se comporta de forma adecuada, se han desarrollado una serie de tests que comprueba tanto la inicialización del contrato como las funciones que ofrece.

```
truffle test
```
![Captura Tests](./images/tests.png?raw=true)  

