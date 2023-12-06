<script setup>
import { ref, onMounted } from 'vue'
// import StarIcon from 'vue-material-design-icons/Star.vue'

import produtoService from '@/services/produto.js'

const produtos = ref([])

onMounted(async () => {
  console.log('oi')
  const data = await produtoService.getAllProdutos()
  produtos.value = data
}) 
</script>

<template>
  <div class="lista">
    <div v-for="produto in produtos" :key="produto.id" class="card">
      <hr>      
      <img :src="produto.capa?.file" :alt="produto.nome" />
      <div class="produto-detail">
        <h3>{{ produto.nome }}</h3>
        <div class="produto-year-rating">
          <p>{{ produto.quantidade }}</p>
          
        </div>
        <p>{{ produto.tema.nome }}</p>
        <p>{{ produto.categoria.descricao }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.lista {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color:#600fab;
}
.card {
  width: 300px;
  height: 500px;  display: flex;

  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.-detail p {
  margin: 0;
}

.-year-rating {
  display: flex;
  column-gap: 55rem;
}

.-detail h3 {
  margin: 0;
  font-size: 1.2rem;
}
.rowwrap{
  display: grid;
  flex-direction: row;
  justify-content: center;
  grid-template-columns:repeat(5,20%);
}
</style>