var fetch = require('node-fetch');

exports.currency = async(symbols) => {
    let currencyArray = [];

    for (const symbol of symbols) {
        const res = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + symbol + '&apikey=' + process.env.ALPHA_TOKEN_A).then(res => res.json());
        currencyArray.push({ price: res["Global Quote"]["05. price"], change: res["Global Quote"]["09. change"] });
    }

    return currencyArray;
}