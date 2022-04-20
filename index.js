import MetamaskOnboarding from "@metamask/onboarding";

const onboarding = new MetamaskOnboarding();

//getting all elements from DOM
const player = document.querySelector(".success-anim");
const btn = document.querySelector('.onboard');
const statusText = document.querySelector('h1');
const statusDesc = document.querySelector('.desc');
const loader = document.querySelector('.loader');
const upArrow = document.querySelector('.up');
const confetti = document.querySelector('.confetti');

const isMetaMaskInstalled = () => {
    //checkig if metamask is installed in the browser
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
}

const onClickInstallMetamask = () => {
    //bring up installation page on browser to install metamask
    onboarding.startOnboarding();
    loader.style.display = "block";
}

let connected = (accounts) => {
    statusText.innerHTML = 'Connected!'
    statusDesc.classList.add('account');
    statusDesc.innerHTML = accounts[0]
    btn.style.display = 'none';
    loader.style.display = 'none';
    upArrow.style.display = 'none';
    confetti.style.display = 'block';
    player.play();
    statusDesc.classList.add('account');
}

async function connectWallet(){
    return await ethereum.request({ method: 'eth_accounts' });
}

const MetamaskClientCheck = () => {
    if(!isMetaMaskInstalled()){
        // if not installed show user to install metamask extension
        statusText.innerText = "You need to Install a Wallet";
        statusDesc.innerText = "We recommend Metamask wallet"
        btn.innerText = "Install Metamask";
        btn.onclick = onClickInstallMetamask;
    }else{
        // if installed then connect to the wallet
        connectWallet().then((accounts) => {
            if(accounts && accounts[0] > 0){
                connected(accounts);
            }else{
                statusText.innerHTML = 'Connect your wallet'
                statusDesc.innerHTML = `To begin, please connect your MetaMask wallet.`
                btn.innerText = 'Connect MetaMask'
                upArrow.style.display = 'block';
            }
        })

    }
}

MetamaskClientCheck()

btn.addEventListener('click', async () => {
    btn.style.backgroundColor = '#cccccc';
    loader.style.display = 'block';

    try {
        const accounts = await ethereum.request({method: 'eth_requestAccounts'})
        connected(accounts)
    } catch (error) {
        console.error(error);
    }
})
