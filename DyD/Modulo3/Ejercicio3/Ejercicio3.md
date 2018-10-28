# Actividades Módulo 3 - PEC 2  

## Ejercicio 3  

Para este ejercicio, nuevamente tenemos que sincronizar un nodo en la red rinkeby.

También tendremos que instalar swarm siguiendo las instrucciones de su web: <https://swarm-guide.readthedocs.io/en/latest/installation.html>

Creamos una nueva cuenta e inicializamos swarm indicando con el siguiente comando:
```
swarm --bzzaccount a40c8004f33a82c3bc1933c66806727c30d833a3 --ens-api test:0xe7410170f87102df0055eb195163a03b7f2bff4a@$HOME/Library/Ethereum/rinkeby/geth.ipc
```

![Captura Swarm conenct](../images/swarm.png?raw=true)  

Subimos la DApp a Swarm:

```
$ swarm --recursive up dist/
2c41f379694c6040732c3dc5c29d8beb965c81aedfeecbba396adac5598f3672
```

Si accedemos a la siguiente URL, en la que indicamos el hash obtenido tras el comando anterior, podemos ver nuestra DApp.

```
http://localhost:8500/bzz:/2c41f379694c6040732c3dc5c29d8beb965c81aedfeecbba396adac5598f3672/index.html
```

![Captura Swarm conenct](../images/Swarm-browser.png?raw=true)  
