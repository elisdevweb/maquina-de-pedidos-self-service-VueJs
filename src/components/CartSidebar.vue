<template>
  <section class="resumo">
    <strong id="resumo-titulo">Resumo do pedido</strong>

    <div v-if="total === 0" class="recibo-vazio">
      <p>Selecione os produtos à esquerda para montar seu pedido.</p>
    </div>

    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th style="text-align: right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(p, i) in produtos.filter((x) => x.ativo)"
            :key="p.nome + i"
          >
            <td>{{ p.quantidade + "x " + p.nome }}</td>
            <td style="text-align: right">
              {{ formatar(p.quantidade * p.preco) }}
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <th style="text-align: right">{{ formatar(total) }}</th>
          </tr>
        </tbody>
      </table>
    </div>

    <button
      class="checkout-btn"
      :disabled="total === 0"
      @click="$emit('finalize')"
      :class="{ disabled: total === 0 }"
    >
      Finalizar pedido
    </button>
  </section>
</template>

<script>
export default {
  name: "CartSidebar",
  props: {
    produtos: { type: Array, required: true },
    total: { type: Number, required: true },
  },
  methods: {
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
