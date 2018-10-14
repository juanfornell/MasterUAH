# Actividades Módulo 2 - PEC 1  

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
