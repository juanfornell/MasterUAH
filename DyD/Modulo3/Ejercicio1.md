# Actividades Módulo 3 - PEC 2  

## Ejercicio 1  

En primer lugar, sincronizamos un nodo completo en modo fast en la red Rinkeby. Con la consola de geth, podemos comprobar que está sincronizado al completo:  

![Captura Nodo Sincronizado](../Modulo3/images/geth-sync.png?raw=true)  

Para registrar el dominio, he seguido el tutorial de la siguiente web: <https://michalzalecki.com/register-test-domain-with-ens/>. En ella está disponible el script ensutils-rinkeby.js adaptado a la red rinkeby. Lo dejamos en la ruta a la que nos hemos conectado con la consola geth, y lo ejecutamos:

```
> loadScript("./ensutils-rinkeby.js")
true
```

Lo siguiente es comprobar si el dominio que queremos registrar está disponible:

```
> testRegistrar.expiryTimes(web3.sha3("juanfornell"))
0
```

Como ha devuelto el valor 0, podemos proceder a registrar el dominio. Antes de esto, debemos desbloquear una cuenta.

```
> personal.unlockAccount(eth.accounts[0])
Unlock account 0x65c57d6a8923ef63a63323939f277347fd2be940
Passphrase: 
true

> testRegistrar.register(web3.sha3('juanfornell'), eth.accounts[0], {from: eth.accounts[0]})
"0xc2f2b088744327304775fd86c3279c0f1c57c616ecdc9bfd774d5e95f90b2ad0"

> ens.owner(namehash("juanfornell.test"))
"0x65c57d6a8923ef63a63323939f277347fd2be940"
```

El siguiente paso es poder resolver. Para ello, asignamos nuestra cuenta:

```
> ens.setResolver(namehash('juanfornell.test'), publicResolver.address, {from: eth.accounts[0]})
"0x9ff9aa88d27e2a5ae34d6089c490db57bc3631b3d8be32c0d0157e01ca7d7be7"

> publicResolver.setAddr(namehash("juanfornell.test"), eth.accounts[0], {from: eth.accounts[0]})
"0x39160ea6fa954881bb652f83efa6a4e40d4358d00ed29ddf66ad80af759e314e"

> getAddr("juanfornell.test")
"0x65c57d6a8923ef63a63323939f277347fd2be940"
```

Captura:  

![Captura ENS Address](../Modulo3/images/ens-address.png?raw=true)  


