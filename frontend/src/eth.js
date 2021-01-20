import { ethers , Contract } from 'ethers'
import PaymentProcessor from './contracts/PaymentProcessor.json'
import Dai from './contracts/Dai.json'

//connecting to blockchain
const getBlockhain = () => 
    new Promise((resolve, reject) => {
        window.addEventListener('load', async () => {
            //here try to detect blockchain network and connect metamasj
            if(window.ethereum) {
                await window.ethereum.enable();
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                
                let account = await provider.listAccounts()
                account= account[0];

                //instatiate contracts 
                const paymentProcessor = new Contract (
                    PaymentProcessor.networks[window.ethereum.networkVersion].address,
                    PaymentProcessor.abi,
                    signer
                )
                const dai = new Contract (
                    Dai.networks[window.ethereum.networkVersion].address,
                    Dai.abi,
                    signer
                )
                resolve({provider, paymentProcessor, dai, account})
            }
            resolve({provider:undefined, connectedAccount:undefined, paymentProcessor: undefined, dai:undefined})
            }) 
    })

export default getBlockhain