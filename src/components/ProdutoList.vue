<script setup>
import { ref, onMounted } from 'vue'
import StarIcon from 'vue-material-design-icons/Star.vue'

import produtoService from '@/services/produto.js'

const produtos = ref([])

onMounted(async () => {
  const data = await produtoService.getAllProdutos()
  produtos.value = data
}) 
</script>

<template>
  <div class="row wrap">
    <div v-for="produto in produtos" :key="produto.id" class="card">
      <img :src="produto.cover.url" :alt="produto.title" />
      <div class="produto-detail">
        <h3>{{ produto.title }}</h3>
        <div class="produto-year-rating">
          <p>{{ produto.year }}</p>
          <div class="rating">
            <StarIcon v-for="n in produto.rating" :key="n" fillColor="orange" size="18" />
            <StarIcon v-for="n in 5 - produto.rating" :key="n" fillColor="gray" size="18" />
          </div>
        </div>
        <p>{{ produto.genre }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 200px;
  height: 400px;
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
  column-gap: 2rem;
}

.-detail h3 {
  margin: 0;
  font-size: 1.2rem;
}
</style>
