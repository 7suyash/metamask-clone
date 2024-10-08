document.addEventListener("DOMCONTENTLOADER", function () {
    //IN THAT WE GOING TO TARGET THE ELEMENT 
    document.getElementById("accountlist").addEventListener("click", changeAccount);
    document.getElementById("userAddress").addEventListener("click", copyAddress);
    document.getElementById("transferFund").addEventListener("click", handler);
    document.getElementById("header_network").addEventListener("click", getOpenNetwork);
    document.getElementById("network_item").addEventListener("click", getSelectedNetwork);
    document.getElementById("add_network").addEventListener("click", setNetwork);
    document.getElementById("loginaccount").addEventListener("click", loginUser);
    document.getElementById("accountCreate").addEventListener("click", createUser);
    document.getElementById("openCreate").addEventListener("click", openCreate);
    document.getElementById("sign_up").addEventListener("click", signUp);
    document.getElementById("login_up").addEventListener("click", login);
    document.getElementById("logout").addEventListener("click", logout);
    document.getElementById("open_Transfer").addEventListener("click", openTransfer);
    document.getElementById("goBack").addEventListener("click", goback);
    document.getElementById("open_Import").addEventListener("click", openImport);
    document.getElementById("open_assets").addEventListener("click",openAssets);
    document.getElementById("open_Activity").addEventListener("click",openActivity);

    document.getElementById("goHomePage").addEventListener("click",goHomePage);
    document.getElementById("openAccountImport").addEventListener("click",openImportModel);
    document.getElementById("close_Import_Account").addEventListener("click",closeImporModel);
    document.getElementById("add_new_token").addEventListener("click",addToken);
    document.getElementById("add_New_Account").addEventListener("click",addAccount);
    

})

let providerURL = "";
let privatekey
let address

// functions for data and their storage
function handler() {
    document.getElementById("transfer_center").style.display="flex";
    const amount=document.getElementById("amount").value;
    const address=document.getElementById("amount").value;
    const private_key="";
    const testaccount="";
    //provider building
    const provider = new ethers.providers.JsonRcpProvider(providerURL);


    let wallet = new ethers.Wallet(privatekey,provider);

    const tx={
        to: address,
        value: ethers.utils.parseEther(amount),
    };


    let a = document.getElementById("link");
    a.href = "some link url";

    wallet.sendTransactions(tx).then((txobj)=> {
    console.log("txHash:",txobj.hash);


    document.getElementById("transfer_center").style.display="none";
    const a =document.getElementById("link");
    document.getElementById("link").style.display="block";
    });
 };
function checkBalance() {
    const provider = new ethers.providers.JsonRcpProvider(providerURL);
    
    provider.getBalance(address).then((balance)=> {
        const balanceInEth = ether.utils.formatEther(balance);

        document.getElementById("accountBalance").innerHTML = '${balanceInEth} MATIC';

        document.getElementById("userAddress").innerHTML = '${address.slice(0,15)}...';
    })
 };
function getOpenNetwork() {
    document.getElementById("network").style.display = "block";
 };
function getSelectedNetwork(e) { 
    const element = document.getElementById("selected_network");
    element.innerHTML = e.target.innerHTML;

    if (e.target.innerHTML === "Ethereum Mainnet ") {
        providerURL = ""
        document.getElementById("network").style.display = "none";
    }
    else if (e.target.innerHTML === "Polygon Mainnet") {
        providerURL ="https://rpc.ankr.com/polygon";
        document.getElementById("network").style.display = "none";
    }
    else if (e.target.innerHTML === "Polygon Amoy") {
        providerURL =
        document.getElementById("network").style.display = "none";
    }
    else if (e.target.innerHTML === "Sepolia testnet ") {
        providerURL ="";
        document.getElementById("network").style.display = "none";
    }
    else if (e.target.innerHTML === "holesky testnet ") {
        providerURL ="";
        document.getElementById("network").style.display = "none";
    }

    console.log(providerURL);
};
function setNetwork() {
    document.getElementById("network").style.display = "none";
 };

function loginUser() {
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("LoginUser").style.display = "block";

 };

function createUser() {
    document.getElementById("createAccount").style.display = "block";
    document.getElementById("LoginUser").style.display = "none";
 };
 function openCreate() {
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("create_popUp").style.display = "block";
  };

function signUp() {
    const name = document.getElementById("sign_up_name").value;
    const email = document.getElementById("sign_up_Email").value;
    const password = document.getElementById("sign_up_password").value;
    const passwordConfirm = document.getElementById("sign_up_passwordConfirm").value;

    document.getElementById("field").style.display = 'none';
    document.getElementById("centre").style.display = 'block';

    const wallet = ethers.Wallet.createRandom();

    if (wallet.address) {
        console.log(wallet)
        //API CALL
        const url = "http://localhost:3000/api/v1/user/signup";

        const data = {
            name:name,
            email:email,
            password:password,
            passwordConfirm:passwordConfirm,
            address:wallet.address,
            private_key:wallet.privatekey,
            mnemonic:wallet.mnemonic.phrase,
        };

        fetch(url, {
            method:"post",
            handlers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => response.json()).then((result) => {
            document.getElementById("createdAddress").innerHTML = wallet.address;
            document.getElementById("createdPrivateKey").innerHTML = wallet.privatekey;
            document.getElementById("createdMnemonic").innerHTML = wallet.mnemonic.phrase;
            document.getElementById("center").style.display = wallet.address;
            document.getElementById("createAddress").innerHTML = "none";
            document.getElementById("accountData").innerHTML = "block";
            document.getElementById("sign_up").innerHTML = "none";

            const userwallet = {
                address:wallet.address,
                private_key:wallet.privatekey,
                mnemonic:wallet.mnemonic.phrase,
            };

            const jsonObj = JSON.stringify(userwallet);
            localStorage.setItem("userWallet",jsonObj);

            document.getElementById("goHomePage").style.display = "block";
            window.location.reload();
        }).catch((error)=> {
            console.log("ERROR:",error);
        });
    }

 };
function login() {
    document.getElementById("login_form").style.display = "none"
    document.getElementById("login_form").style.display = "block"

    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;

    //API CALL
    const url ="http://localhost:3000/api/v1/user/login";
    const data = {
        email:email,
        password:password
    };

    fetch(url,{
        method:'POST',
        handlers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data)
    }).then((response)=>response.json()).then((result) => {
        console.log(result)
        const userWallet = {
            address: result.data.user.address,
            private_key: result.data.user.private_key,
            mnemonic: result.data.user.mnemonic,

        };

        const jsonObj = JSON.stringify(userWallet);
        localStorage.setItem("userWallet",jsonObj);
        window.location.reload();
    } ).catch((error)=> {
        console.log(error);
    });
 };
function logout() {
    localStorage.removeItem("userWallet");
    window.location.reload();
 };
function openTransfer() { 
    document.getElementById("transfer_from").style.display = "block";
    document.getElementById("home").style.display = "none";
};
function goback() { 
    document.getElementById("transfer_from").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function openImport() { 
    document.getElementById("import_token").style.display = "block";
    document.getElementById("home").style.display = "none";
};

function importGoBack() {
    document.getElementById("import_token").style.display = "none";
    document.getElementById("home").style.display = "block";
 };

function openActivity() { 
    document.getElementById("activity").style.display = "block";
    document.getElementById("assets").style.display = "none";
};

function openAssets() {
    document.getElementById("activity").style.display = "none";
    document.getElementById("assets").style.display = "block";
 };
function goHomePage() { 
    document.getElementById("create_popUp").style.display = "none";
    document.getElementById("home").style.display = "block";
};
function openImportModel() {
    document.getElementById("imort_account").style.display = "block";
    document.getElementById("home").style.display = "none";
 };
 function closeImport(){
    document.getElementById("import_account").style.display="none";
    document.getElementById("home").style.display="block";
    };
    function addToken(){
     const address=document.getElementById("token address").value;
     const name=document.getElementById("token_name").value;
     const symbol=document.getElementById("token_symbol").value;
    
     //api call
       const url='';
       const data={
        name:name,
        address:address,
        symbol:symbol,
       };
    
       fetch(url, {
        method: "post",
        handlers: {
            "content_type":"application/JSON",
    
        },
        body:JSON.stringify(data)
       }).then((response)=> response.json())
       .then((result)=>{
        console.log(result);
        windows.location.reload();
    
       })
       .catch((error)=>{
        console.log("ERROR",error); 
       });
    };
    function addAccoount(){
        const privatekey=document.getElementById("add_account_private_key").value;
        const provider=new ethers.providers.JsonRcpProvider(providerURL);
    
        let wallet=new ethers.Wallet(privatekey,provider);
         console.log(wallet);
    
    const url="";
    
    const data={
        privatekey:privatekey,
        adrress:wallet.address,
    };
    fetch(url, {
        method: "post",
        handlers: {
            "content_type":"application/JSON",
    
        },
        body:JSON.stringify(data),
    }).then((response)=>response.json())
    .then((result)=>{
    console.log(result);
    }).catch((error)=>{
      console.log(error);
    
    });
    
    
    }
    function myFunction(){
        const str=localStorage.getItem("userWallet");
        const parseObj=JSON.parse(str);
    
    
        if(parseObj.address){
            document.getElementById("loginuser").style.dsiplay="none";
            document.getElementById("home").style.display="block";
    
    privatekey=parseObj.private_key;
    address=parseObj.adddress;
    
    checkbalance(parseObj.address);
      }
          const tokenRender=document.querySelector("assets");
          const accountRender=document.querySelector(".accountlist");
          const url="http://localhost:3000/api/v1/tokens"
          fetch(url).then((response)=>response.json()).then((data)=>{
            let elements="";
    data.data.token.map((token)=>
    (elements += `
        <div class="assets_item>
        <img class="assets_item_png"
        src="./assets/theblockchaincoders.png"
        alt=""
        />
        
        <span> ${token.address.slice(0,15)}....</span>
        <span>${token.symbol}</span>
        </div>
        `)
    );
         tokenRender.innerHTML.elements;
    
          }).catch((error)=>{
            console.log(error);
    
          });
          fetch("http://localhost:3000/api/v1/account/allaccount").then((response)=>response.json()).then((data)=>{
            let accounts="";
    
               data.data.accounts.map((account,i)=>
               
            account += `
               <div class="list">
               <p> ${i+1}</p>
               <p class ="accountsValue" data-address=${accounts.address} data-privatekey=${account.privatekey}>
               ${account.adddress.sclice(0,25)}...</p>
        
               </div>`
            ); accountRender.innerHTML=accounts;
    
    
          }).catch((error)=>{
            console.log(error);
          });
          console.log(privatekey);
    
    };
    function copyAddress(){
        navigator.clipboard.writeText(address);
    };
    function changeAccount(){
    const data=document.querySelector("accountValue");
    const address= data.getAttribute("data-address");
    const privateKey=data.getAttribute("data-privatekey");
    console.log(privateKey,address);
    
    const userwallet={
        address: address,
        private_key:privateKey,
        mnemonic:"changed"
    
    };
    const jsonObj =JSON.stringfy(userwallet);
    localStorage.setitem("userwallet",jsonObj)
    
    window.location.reload();
    };
    window.onload=myFunction;
