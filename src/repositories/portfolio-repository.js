const Portfolio = require('../app/models/portfolio');

exports.post = async(data) => {
    const portfolio = new Portfolio(data);
    await portfolio.save();
}

exports.getAll = async() => {
    const res = await Portfolio.find();
    return res;
}

exports.getById = async(id) => {
    const res = await Portfolio.findById(id);
    return res;
}

exports.put = async(id, data) => {
    await Portfolio.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            creationDate: data.creationDate,
            symbols: data.symbols,
            quantity: data.quantity
        }
    });
}

exports.delete = async(id) => {
    await Portfolio.findByIdAndDelete(id);
}