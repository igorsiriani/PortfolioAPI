const repository = require('../repositories/portfolio-repository');
const currency = require('../services/currency-service');

exports.post = async (req, res) => {
    try {
        var currentdate = new Date(); 
        let arrayData = [];
        let newPortfolio = {
            name: req.body.name,
            creationDate: currentdate.getDate() + "/"
                            + (currentdate.getMonth()+1)  + "/" 
                            + currentdate.getFullYear() + " - "  
                            + currentdate.getHours() + ":"  
                            + currentdate.getMinutes(),
            symbols: req.body.symbols,
            quantity: req.body.quantity
        }
        await repository.post(newPortfolio); 

        let currArray = await currency.currency(newPortfolio.symbols);
        currArray = JSON.stringify(currArray);

        let itemString = JSON.stringify(newPortfolio);
        let index = itemString.indexOf(",\"_id\"");

        var tempArr = itemString.split('');
        tempArr.splice(index, 0, ",\"currency\":" + currArray);

        let newItem = JSON.parse(tempArr.join(''));

        arrayData.push(newItem);

        res.status(201).send({
            message: 'Portfolio added successfully',
            data: arrayData
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed processing request',
            erro: error.toString()
        });
    }

};

exports.getAll = async(req, res) => {
    try {
        const data = await repository.getAll();
        const quantity = data.length;
        let arrayData = [];

        for (const item of data) {
            let currArray = await currency.currency(item);
            let totalInvest = currArray[1];
            
            currArray = JSON.stringify(currArray[0]);

            let itemString = JSON.stringify(item);
            let index = itemString.indexOf(",\"_id\"");

            var tempArr = itemString.split('');
            tempArr.splice(index, 0, ",\"currency\":" + currArray + ",\"totalInvest\":" + totalInvest);

            let newItem = JSON.parse(tempArr.join(''));

            arrayData.push(newItem);
        }

        res.status(201).send({"total": quantity, "data": arrayData});
    } catch (error) {
        res.status(500).send({
            message: 'Failed processing request',
            erro: error.toString()
        });
    }

};

exports.getById = async(req, res) => {
    try {
        const id = req.params.portfolioId;
        const data = await repository.getById(id);
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({message: 'Portfolio not found'});
        }
    } catch (error) {
        res.status(500).send({
            message: 'Failed processing request',
            erro: error.toString()
        });
    }

};

exports.put = async(req, res) => {
    try {
        const id = req.params.portfolioId;
        const data = await repository.put(id, req.body);
        res.status(200).send({
            message: 'Portfolio updated successfully',
            data: data
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed processing request',
            erro: error.toString()
        });
    }

};

exports.delete = async(req, res) => {
    try {
        await repository.delete(req.params.portfolioId);
        res.status(200).send({
            message: 'Portfolio deleted successfully'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed processing request',
            erro: error.toString()
        });
    }
};