# Actividades Módulo 2 - PEC 1  

## Ejercicio 3  

En primer lugar, instalamos el compilador de Solidity.

```
$ git clone --recursive https://github.com/ethereum/solidity.git
$ ./install_deps.sh  
$ ./build.sh
```

Como hemos instalado la última versión del compilador, la 0.5.0, vamos a utilizar un smart contract que aparece en su [documentación](https://media.readthedocs.org/pdf/solidity/develop/solidity.pdf) para que todo funcione correctamente. El contrato que vamos a utilizar es [storage.sol](storage.sol).  

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