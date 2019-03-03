var GestionPartes = artifacts.require('./GestionPartes.sol')

contract('GestionPartes', function (accounts) {

    //Comprobamos que los partes se crean correctamente con unos valores específicos
    it('los partes se crean correctamente', function () {
        var partes
        var _dia = '11'
        var _lugar = 'Madrid'
        var _matriculaA = '1234ABC'
        var _matriculaB = '0987ZHU'

        //Creamos un parte para poder validar que se crea correctamente
        return GestionPartes.deployed().then(function (instance) {
            partes = instance
            partes.crearParte(_dia, _lugar, _matriculaA, _matriculaB, { from: accounts[0] })
            return partes.getLugar.call(accounts[0], { from: accounts[0] })
        }).then(function (lugar) {
            //Validamos que se ha creado correctamente la variable lugar en el parte y se recupera con su función get
          assert.equal(lugar.valueOf(), _lugar, "el lugar del parte no es el esperado")
          return partes.getDia.call(accounts[0], { from: accounts[0] })
        }).then(function (dia) {
            //Validamos que se ha creado correctamente la variable dia en el parte y se recupera con su función get
            assert.equal(dia.valueOf(), _dia, "el dia del parte no es el esperado")
            return partes.getMatriculaA.call(accounts[0], { from: accounts[0] })
        }).then(function (matriculaA) {
            //Validamos que se ha creado correctamente la variable matriculaA en el parte y se recupera con su función get
            assert.equal(matriculaA.valueOf(), _matriculaA, "la matricula del vehículo creador no es la esperada")
            return partes.getMatriculaB.call(accounts[0], { from: accounts[0] })
      }).then(function (matriculaB) {
          //Validamos que se ha creado correctamente la variable matriculaB en el parte y se recupera con su función get
        assert.equal(matriculaB.valueOf(), _matriculaB, "la matricula del otro vehículo no es la esperada")
      })

    })
})