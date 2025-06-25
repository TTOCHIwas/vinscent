function binaryToUuid(buffer) {
  if (!Buffer.isBuffer(buffer)) return '';
  const hex = buffer.toString('hex');
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20)
  ].join('-');
}

module.exports = { binaryToUuid };