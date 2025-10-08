<template>
  <div class="itens-list" role="list">
    <ProductCard
      v-for="(produto, index) in produtos"
      :key="produto.nome + index"
      :produto="produto"
      :index="index"
      @toggle="onToggle"
      @inc="onInc"
      @dec="onDec"
    />
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductList",
  components: { ProductCard },
  props: {
    produtos: { type: Array, required: true },
  },
  methods: {
    onToggle(index) {
      this.$emit("toggle", index);
    },
    onInc(index) {
      this.$emit("increment", index);
    },
    onDec(index) {
      this.$emit("decrement", index);
    },
  },
};
</script>
