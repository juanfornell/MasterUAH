# Actividades Módulo 2 - PEC 1  

## Ejercicio 1  

Para empezar, tenemos que crear una cuenta con geth. Nuestro address es: 8230b42f053d6d29bac122fd5a78ce34e9f43fc1.

![Captura New Accout Geth](images/geth-newAccount.png?raw=true)  

Con el comando `geth account list` podemos ver que nuestra cuenta está en el listado.  

![Captura Account List](images/geth-accounts.png?raw=true)  

Lo siguiente que debemos hacer es crear el fichero genesis.json con los información necesaria para crear nuestra blockchain. Incluiremos la dirección que hemos creado previamente con geth.

![Captura Genesis](images/genesis.png?raw=true)  

Para interactuar con la consola, lanzamos el siguiente comando:  

`$ geth --datadir "~/Library/LocalNode1" --networkid 1234 --port 11111 --nodiscover console`  

Si copiamos el fichero con la dirección que creamos al inicio con geth en el directorio keystore del nodo de nuestra blockchain, podemos ver a través de la consola que está en la lista de wallets:

`> cp UTC--2018-10-12T14-48-22.837752000Z--8230b42f053d6d29bac122fd5a78ce34e9f43fc1 ~/Library/LocalNode1/keystore/`  

`> personal.listWallets`  

![Captura Wallet List](images/listWallets.png?raw=true)  

También podemos comprobar el balance del address que hemos creado al inciio para comprobar que contiene los 5 billones de ether que habíamos introducido en el archivo genesis.json.

```
> web3.fromWei(eth.getBalance(eth.accounts[0]), "ether");  
500000000000
```


Para minar, creamos en primer lugar una nueva dirección en la que guardaremos la recompensa:

`$ personal.newAccount()`  

![Captura New Account](images/mining-newAccount.png?raw=true)  

Asignamos dicha dirección para minar con el siguiente comando:

`$ miner.setEtherbase(eth.accounts[1])`  

Antes de comenzar el minado, creamos una nueva cuenta y realizamos una transacción enviando 20 ethers desde la address del bloque genesis.

`$ personal.unlockAccount(eth.accounts[0])`  

`$ eth.sendTransaction({from: eth.accounts[0], to: "0xdb9ec4d6a5f8bdd601ee7fbea6110d91eee96dc9", value: 20})`  

![Captura Start Mining](images/transaction.png?raw=true)  

Para comenzar a minar, comenzamos con el comando `miner.start()` y finalizamos con el comando `miner.stop()`  

![Captura Start Mining](images/start-mining.png?raw=true)  

También comprobamos con el siguiente comando el balance de la dirección en la que estamos guardando la recompensa para ver que efectivamente hemos minado ethers.

`$ eth.getBalance(eth.accounts[1])`  

![Captura Stop Mining](images/stop-mining.png?raw=true)  


## Ejercicio 2  

Para sincronizarnos con Rinkeby, ejecutamos el siguiente comando.

`$ geth --rinkeby`  

![Captura Rinkeby Syncing](images/rinkeby-sync.png?raw=true)  

Obtenemos el address con el comando admin.  

`$ admin.nodeInfo.protocols.eth.genesis`  

![Captura Rinkeby Genesis](images/rinkeby-genesis.png?raw=true)  

El número de peers conectados a nuestro nodo los podemos ver con el siguiente comando.  

`$ admin.peers.length`  

Si queremos ver la información de los peers, consultamos el número de bloque del address que aparece en el campo head.  

```
$ eth.getBlock(admin.peers[0].protocols.eth.head).number  
$ eth.getBlock(admin.peers[1].protocols.eth.head).number
```

![Captura Peers](images/peers.png?raw=true)  

En uno de los nodos no podemos obtener el número de bloque pero en el otro vemos que es el 3142498.  


## Ejercicio 3  

En primer lugar, instalamos el compilador de Solidity.

```
$ git clone --recursive https://github.com/ethereum/solidity.git
$ ./install_deps.sh  
$ ./build.sh
```

Como hemos instalado la última versión del compilador, la 0.5.0, vamos a utilizar un smart contract que aparece en su [documentación] (https://media.readthedocs.org/pdf/solidity/develop/solidity.pdf) para que todo funcione correctamente. El contrato que vamos a utilizar es [storage.sol] (storage.sol).  

Para obtener los códigos de operación, utilizamos el siguiente comando.

```
$ solc --optimize --opcodes storage.sol
Warning: This is a pre-release compiler version, please do not use it in production.

======= storage.sol:SimpleStorage =======
Opcodes: 
PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0xD0 DUP1 PUSH2 0x1F PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH1 0x48 JUMPI PUSH4 0xFFFFFFFF PUSH29 0x100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 CALLDATALOAD DIV AND PUSH4 0x60FE47B1 DUP2 EQ PUSH1 0x4D JUMPI DUP1 PUSH4 0x6D4CE63C EQ PUSH1 0x75 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH1 0x58 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x73 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x20 DUP2 LT ISZERO PUSH1 0x6D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD PUSH1 0x99 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH1 0x80 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x87 PUSH1 0x9E JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD SWAP2 DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST PUSH1 0x0 SSTORE JUMP JUMPDEST PUSH1 0x0 SLOAD SWAP1 JUMP INVALID LOG1 PUSH6 0x627A7A723058 KECCAK256 PUSH7 0x52A7C261D8BEF8 0xdf JUMP 0xe SWAP7 0xb1 0xf6 MOD 0xab PUSH20 0x821AB2D3C25CB18919F482EF6D43DE0029000000 
```  

Los identificadores de las funciones los podemos ver con el comando solc y la opción de hash.

```
$ solc --optimize --hashes storage.sol
Warning: This is a pre-release compiler version, please do not use it in production.

======= storage.sol:SimpleStorage =======
Function signatures: 
6d4ce63c: get()
60fe47b1: set(uint256)
```

Por último, la estimación del gas lo podemos ver con la opción --gas.

```
$ solc --optimize --gas storage.sol
Warning: This is a pre-release compiler version, please do not use it in production.

======= storage.sol:SimpleStorage =======
Gas estimation:
construction:
   93 + 41600 = 41693
external:
   get():	406
   set(uint256):	20175
```