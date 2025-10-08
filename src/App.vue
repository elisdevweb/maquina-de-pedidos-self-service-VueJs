<template>
  <main id="app">
    <HeaderBar />

    <section class="itens" aria-labelledby="produtosTitle">
      <h4 id="produtosTitle">Selecione os produtos</h4>
      <ProductList
        :produtos="produtos"
        @toggle="toggleActive"
        @increment="incrementar"
        @decrement="decrementar"
      />
    </section>

    <CartSidebar
      :produtos="produtos"
      :total="total"
      @finalize="finalizarPedido"
    />
  </main>
</template>

<script>
import HeaderBar from "./components/HeaderBar.vue";
import ProductList from "./components/ProductList.vue";
import CartSidebar from "./components/CartSidebar.vue";
import { produtos as produtosOriginais } from "./data/produtos.js";

export default {
  name: "App",
  components: { HeaderBar, ProductList, CartSidebar },
  data() {
    return {
      produtos: JSON.parse(JSON.stringify(produtosOriginais)),
    };
  },
  computed: {
    total() {
      return this.produtos.reduce(
        (acc, p) => acc + (p.ativo ? p.preco * p.quantidade : 0),
        0
      );
    },
  },
  methods: {
    formatarValor(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });
    },

    toggleActive(index) {
      const p = this.produtos[index];
      p.ativo = !p.ativo;
      if (!p.ativo) p.quantidade = 1;
    },
    incrementar(index) {
      this.produtos[index].quantidade =
        Number(this.produtos[index].quantidade) + 1;
    },
    decrementar(index) {
      if (this.produtos[index].quantidade > 1) {
        this.produtos[index].quantidade =
          Number(this.produtos[index].quantidade) - 1;
      }
    },
    finalizarPedido() {
      if (this.total === 0) {
        alert("Nenhum item selecionado.");
        return;
      }

      const itens = this.produtos
        .filter((p) => p.ativo)
        .map(
          (p) =>
            `${p.quantidade}x ${p.nome} — ${this.formatarValor(
              p.quantidade * p.preco
            )}`
        );

      const mensagem = [
        "✅ Pedido finalizado com sucesso!",
        "",
        ...itens,
        "",
        `Total: ${this.formatarValor(this.total)}`,
      ].join("\n");

      alert(mensagem);

      // reset
      this.produtos.forEach((p) => {
        p.ativo = false;
        p.quantidade = 1;
      });
    },
  },
};
</script>
