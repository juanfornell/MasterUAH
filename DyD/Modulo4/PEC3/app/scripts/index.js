// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
//import metaCoinArtifact from '../../build/contracts/MetaCoin.json'

// Importamos nuestro artefacto
import gestionPartesArtifact from '../../build/contracts/GestionPartes.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
//const MetaCoin = contract(metaCoinArtifact)


const GestionPartes = contract(gestionPartesArtifact)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
let accounts
let account

const App = {
  start: function () {
    const self = this

    // Bootstrap the MetaCoin abstraction for Use.
    //MetaCoin.setProvider(web3.currentProvider)

    GestionPartes.setProvider(web3.currentProvider)

   

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length === 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        return
      }

      accounts = accs
      account = accounts[0]

      self.refreshAddress()
    })
  
  },

  setStatus: function (message) {
    const status = document.getElementById('status')
    status.innerHTML = message
  },

  refreshAddress: function () {
    const self = this

    
    const addressElement = document.getElementById('address')
    addressElement.innerHTML = web3.eth.accounts[0]

    let _partes

    GestionPartes.deployed().then(function (instance) {
      _partes = instance
      return _partes.getDia.call(web3.eth.accounts[0], { from: account })
    }).then(function (value) {
      const nameElement = document.getElementById('diaParte')
      nameElement.innerHTML = value.valueOf()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error getting lugar; see log.')
    })

    GestionPartes.deployed().then(function (instance) {
      _partes = instance
      return _partes.getLugar.call(web3.eth.accounts[0], { from: account })
    }).then(function (value) {
      const nameElement = document.getElementById('lugarParte')
      nameElement.innerHTML = value.valueOf()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error getting lugar; see log.')
    })

    GestionPartes.deployed().then(function (instance) {
      _partes = instance
      return _partes.getMatriculaA.call(web3.eth.accounts[0], { from: account })
    }).then(function (value) {
      const nameElement = document.getElementById('matriculaAParte')
      nameElement.innerHTML = value.valueOf()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error getting lugar; see log.')
    })

    GestionPartes.deployed().then(function (instance) {
      _partes = instance
      return _partes.getMatriculaB.call(web3.eth.accounts[0], { from: account })
    }).then(function (value) {
      const nameElement = document.getElementById('matriculaBParte')
      nameElement.innerHTML = value.valueOf()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error getting lugar; see log.')
    })

    /*
    let _gestionPartes
    GestionPartes.deployed().then(function (instance) {
      _gestionPartes = instance
      return _gestionPartes.getAdress.call({ from: account })
    }).then(function (value) {
      const balanceElement = document.getElementById('address')
      balanceElement.innerHTML = value.valueOf()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error getting address; see log.')
    })
    */
  },

  crearNuevoParte: function () {
    const self = this

    const dia = document.getElementById('dia').value
    const lugar = document.getElementById('lugar').value
    const matriculaA = document.getElementById('matriculaA').value
    const matriculaB = document.getElementById('matriculaB').value

    this.setStatus('Iniciando transacción... (por favor espere)')

    let partes 
    GestionPartes.deployed().then(function (instance) {
      partes = instance
      return partes.crearParte(dia, lugar, matriculaA, matriculaB, { from: account })
    }).then(function () {
      self.setStatus('Parte creado correctamente.')
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error en la creación del parte.')
    })

    self.refreshAddress()
  },

  /*
  sendCoin: function () {
    const self = this

    const amount = parseInt(document.getElementById('amount').value)
    const receiver = document.getElementById('receiver').value

    this.setStatus('Initiating transaction... (please wait)')

    let meta
    GestionPartes.deployed().then(function (instance) {
      meta = instance
      return meta.sendCoin(receiver, amount, { from: account })
    }).then(function () {
      self.setStatus('Transaction complete!')
      self.refreshBalance()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error sending coin; see log.')
    })
  }*/
}

window.App = App

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn(
      'Using web3 detected from external source.' +
      ' If you find that your accounts don\'t appear or you have 0 MetaCoin,' +
      ' ensure you\'ve configured that source properly.' +
      ' If using MetaMask, see the following link.' +
      ' Feel free to delete this warning. :)' +
      ' http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn(
      'No web3 detected. Falling back to http://127.0.0.1:8545.' +
      ' You should remove this fallback when you deploy live, as it\'s inherently insecure.' +
      ' Consider switching to Metamask for development.' +
      ' More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
  }

  // Refresh page if address changes
  var accountInterval = setInterval(function() {
    if (web3.eth.accounts[0] !== account) {
      account = web3.eth.accounts[0];
      window.location.reload();
    }
}, 100);

  App.start()
})
