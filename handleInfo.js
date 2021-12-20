function handleIndex(request, response) {
    let battlesnakeInfo = {
        apiversion: '1',
        author: 'uncleBlobby',
        color: '#FF5733',
        head: 'shades',
        tail: 'bolt',
        version: '0.1.0-alpha'
    };
    //response.status(200).json(battlesnakeInfo);
    console.log(`index handled`);
    return battlesnakeInfo;
};

module.exports = {
    handleIndex: handleIndex
}