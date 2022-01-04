// Get top 10 tokens in Coinpaprika which are available in 1inch as well

async function getTopTenTokens() {

    let response = await fetch('https://api.coinpaprika.com/v1/coins');
    let coinsAndTokens = await response.json();
    let topList = coinsAndTokens.splice(0,10);
    let symbolList = topList.map(coinToken => coinToken.symbol)
    
    response = await fetch('https://api.1inch.io/v4.0/1/tokens');
    coinsAndTokens = await response.json();
    
    // TODO: replace implementation and use Array.include
    function isTop10(coinToken) {
        let isCoinTokenTop10 = false;
        symbolList.forEach(symbol => {
            if(symbol == coinToken.symbol) { isCoinTokenTop10 = true; }
        });
        return isCoinTokenTop10;
    }
    
    let coinTokenList = Object.values(coinsAndTokens.tokens);
    coinTokenList = coinTokenList.filter(isTop10);
    
    // let listItems = coinTokenList.map(token => '<li>${token.name} (${token.symbol}): ${token.address} Decimals: ${token.decimals}</li>');

    let select = document.getElementById('fromTokenAddress');

    for (let coinToken of coinTokenList)
    {
        let option = document.createElement("option");
        option.value = coinToken.address;
        option.text = coinToken.symbol;
        select.appendChild(option);
    }

    select = document.getElementById('toTokenAddress');

    for (let coinToken of coinTokenList)
    {
        let option = document.createElement("option");
        option.value = coinToken.address;
        option.text = coinToken.symbol;
        select.appendChild(option);
    }
    
}

getTopTenTokens();