# Actividades Módulo 3 - PEC 2  

## Ejercicio 2  

Lo primero ha sido instalar IPFS siguiendo las instrucciones del siguiente link: <https://docs.ipfs.io/introduction/install/>.

También hemos cogido el proyecto de pet-shop modificando en el fichero index.html el título por: Juan's Pet Shop.

Inicializamos IPFS y daemon con los siguientes comandos:

![Captura IPFS init](../images/ipfs-daemon.png?raw=true)  

Para poder subirlo a IPFS, se ha creado el directorio _dist_ con el contenido de _src_ y _build/contracts_. Una vez hecho esto, hemos añadido a IPFS el contenido de este directorio y lo hemos publicado, obteniendo el siguiente hash:

```
QmSm6GaUC4dNfwSbKu8QZj8M5Bf4dRBS2bEkU1QGs51sek
```
![Captura IPFS publish](../images/ipfs-publish.png?raw=true)  

Ahora ya podemos acceder a través del siguiente link: <https://gateway.ipfs.io/ipfs/QmSm6GaUC4dNfwSbKu8QZj8M5Bf4dRBS2bEkU1QGs51sek/>

Accedemos y vemos que están disponibles las mascotas para adoptar.

![Captura Juan's Pet Shop](../images/Juan-petshop.png?raw=true)  

Vamos a intentar adoptar a Frieda pulsando en el botón _Adopt_. Vemos que aparece la ventana de MetaMask. Confirmamos la transacción en MetaMask.

![Captura Adopt Metamask](../images/adopt-metamask.png?raw=true)  

Ahora podemos ver que la mascota Frieda ha sido adoptada.

![Captura Success](../images/success.png?raw=true)  
