# Actividades propuestas Módulo 1

Para realizar las tareas, ha sido necesario iniciar Ganache y acceder a la consola de truffle:\
`ganache-cli`\
`truffle console`\

**Comprobar que existe conexión a un nodo**\
`web3.version.node`\

**Comprobar si están o no sincronizando nuevos bloques**\
`web3.eth.syncing`\
Este comando nos indica _false_ porque no se están minando nuevos bloques continuamente, sino que se generan solo cuando los necesitamos.\

**Balance de la cuenta que ha desplegado el contrato en la blockchain**\
`web3.eth.getBalance(web3.eth.accounts[0])`\

**Address de la cuenta número 3 de Ganache o ganache-cli**\
`web3.eth.accounts[3]`\

**Número de bloque en el que se encuentra la blockchain en ese instante. ¿Por qué?**\
`web3.eth.blockNumber`\
El número de bloque se corresponde con el número de transacciones que han sido necesarias para desplegar los contratos, ya que solo se minan nuevos bloques cuando necesitamos realizar transacciones.\

**Dirección del host de la blockchain**\
`web3.currentProvider`\

**Acceda a ethgasstation y convierta el precio del gas en ese instante a Ether**\
En ethgasstation aparece el precio del gas en Gwei, 3.7. Primero hay que pasarlo a Wei y después a ether.\
`web3.fromWei(web3.toWei(3.7, 'Gwei'), 'ether')`\
El resultado son 0.0000000037 ethers.\
