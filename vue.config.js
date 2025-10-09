const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  publicPath:
    process.env.NODE_ENV === "production"
      ? "/maquina-de-pedidos-self-service-VueJs/"
      : "/",
});
