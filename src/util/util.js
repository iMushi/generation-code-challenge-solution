const array_chunks = (array, chunk_size) => array
    .map((_, i, all) => all.slice(i*chunk_size, (i+1)*chunk_size))
    .filter(x => x.length)

module.exports = {
    array_chunks : array_chunks
}
