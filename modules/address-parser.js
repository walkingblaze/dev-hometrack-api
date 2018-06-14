function concatAddress(address) {
    if (address === null || address === undefined || typeof address !== 'object') {
        throw new Error('Error: Invalid address');
    }

    return [
            address.unitNumber,
            address.buildingNumber,
            address.street,
            address.suburb,
            address.state,
            address.postcode,
        ]
        .filter(i => i)
        .join(' ');
};

module.exports.concatAddress = concatAddress;