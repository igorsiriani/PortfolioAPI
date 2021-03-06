var fetch = require('node-fetch');

exports.currency = async(item) => {
    let currencyArray = [];
    let totalInvest = 0;

    for (const symbol of item.symbols) {
        const res = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + symbol + '&apikey=' + process.env.ALPHA_TOKEN_A).then(res => res.json());
        totalInvest += (parseFloat(res["Global Quote"]["05. price"]) * parseFloat(item.quantity));
        currencyArray.push({ price: (parseFloat(res["Global Quote"]["05. price"]) * parseFloat(item.quantity)), change: res["Global Quote"]["09. change"] });
    }

    return [currencyArray, totalInvest];
}