# Actividades Módulo 2 - PEC 1  

## Ejercicio 1  

Para empezar, tenemos que crear una cuenta con geth. Nuestro address es: 8230b42f053d6d29bac122fd5a78ce34e9f43fc1.

![Captura New Accout Geth](../images/geth-newAccount.png?raw=true)  

Con el comando `geth account list` podemos ver que nuestra cuenta está en el listado.  

![Captura Account List](../images/geth-accounts.png?raw=true)  

Lo siguiente que debemos hacer es crear el fichero genesis.json con los información necesaria para crear nuestra blockchain. Incluiremos la dirección que hemos creado previamente con geth.

![Captura Genesis](../images/genesis.png?raw=true)  

Para interactuar con la consola, lanzamos el siguiente comando:  

`$ geth --datadir "~/Library/LocalNode1" --networkid 1234 --port 11111 --nodiscover console`  

Si copiamos el fichero con la dirección que creamos al inicio con geth en el directorio keystore del nodo de nuestra blockchain, podemos ver a través de la consola que está en la lista de wallets:

`> cp UTC--2018-10-12T14-48-22.837752000Z--8230b42f053d6d29bac122fd5a78ce34e9f43fc1 ~/Library/LocalNode1/keystore/`  

`> personal.listWallets`  

![Captura Wallet List](../images/listWallets.png?raw=true)  

También podemos comprobar el balance del address que hemos creado al inciio para comprobar que contiene los 5 billones de ether que habíamos introducido en el archivo genesis.json.

```
> web3.fromWei(eth.getBalance(eth.accounts[0]), "ether");  
500000000000
```


Para minar, creamos en primer lugar una nueva dirección en la que guardaremos la recompensa:

`$ personal.newAccount()`  

![Captura New Account](../images/mining-newAccount.png?raw=true)  

Asignamos dicha dirección para minar con el siguiente comando:

`$ miner.setEtherbase(eth.accounts[1])`  

Antes de comenzar el minado, creamos una nueva cuenta y realizamos una transacción enviando 20 ethers desde la address del bloque genesis.

`$ personal.unlockAccount(eth.accounts[0])`  

`$ eth.sendTransaction({from: eth.accounts[0], to: "0xdb9ec4d6a5f8bdd601ee7fbea6110d91eee96dc9", value: 20})`  

![Captura Start Mining](../images/transaction.png?raw=true)  

Para comenzar a minar, comenzamos con el comando `miner.start()` y finalizamos con el comando `miner.stop()`  

![Captura Start Mining](../images/start-mining.png?raw=true)  

También comprobamos con el siguiente comando el balance de la dirección en la que estamos guardando la recompensa para ver que efectivamente hemos minado ethers.

`$ eth.getBalance(eth.accounts[1])`  

![Captura Stop Mining](../images/stop-mining.png?raw=true)  
