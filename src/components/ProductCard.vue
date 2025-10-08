<template>
  <div
    class="produto"
    :class="{ selecionado: produto.ativo }"
    role="listitem"
    tabindex="0"
    @click="emitToggle"
    @keyup.enter="emitToggle"
  >
    <div class="foto">
      <img :src="produto.foto" :alt="produto.nome" />
    </div>

    <div class="descricao">
      <span class="nome">{{ produto.nome }}</span>
      <span class="preco">{{ formatar(produto.preco) }}</span>

      <div class="quantidade-area" v-if="produto.ativo">
        <button :disabled="produto.quantidade <= 1" @click.stop="emitDec">
          -
        </button>
        <span class="quantidade">{{ produto.quantidade }}</span>
        <button @click.stop="emitInc">+</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    produto: { type: Object, required: true },
    index: { type: Number, required: true },
  },
  methods: {
    emitToggle() {
      this.$emit("toggle", this.index);
    },
    emitInc() {
      this.$emit("inc", this.index);
    },
    emitDec() {
      this.$emit("dec", this.index);
    },
    formatar(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });
    },
  },
};
</script>
