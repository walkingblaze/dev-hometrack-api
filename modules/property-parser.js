function filterHtvCompleted (sourceObject) {
    if (!Array.isArray(sourceObject)) {
        throw new Error('Error: sourceObject is not of Array type');
    }

    return sourceObject.filter(property => property.type === 'htv' && property.workflow === 'completed');
};

module.exports.filterHtvCompleted = filterHtvCompleted;