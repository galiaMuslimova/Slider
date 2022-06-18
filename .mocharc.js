module.exports = {
  global: ['jQuery', '$'],
  require: ["ts-node/register", "ignore-styles", "source-map-support/register", "recursive"],
  spec: "src/**/*.test.ts",
}