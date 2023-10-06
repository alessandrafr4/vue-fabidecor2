<script setup>
import { ref, onMounted } from 'vue'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import ContentSaveIcon from 'vue-material-design-icons/ContentSave.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'

import categoriaService from '@/services/categoria.js'

const categorias = ref([])
const currentCategoria = ref({
  descricao: ''
})

onMounted(async () => {
  const data = await categoriaService.getAllCategorias()
  categorias.value = data
})

async function save() {
  await categoriaService.saveCategoria(currentCategoria.value)
  const data = await categoriaService.getAllCategorias()
  categorias.value = data
  currentCategoria.value = { descricao: '' }
}

async function deleteCategoria(categoria) {
  await categoriaService.deleteCategoria(categoria)
  const data = await categoriaService.getAllCategorias()
  categorias.value = data
} 

function editCategoria(categoria) {
  currentCategoria.value = { ...categoria }
}
</script>

<template>
  <header>
    <div class="esquerdo">  <strong> Categoria </strong></div>
  </header>
  <div class="row center">
    <form class="form">
      <div class="row">
        <div class="row form-item">
          <input type="text" placeholder="Categoria" v-model="currentCategoria.name" @keyup.enter="save" />
          <label for="">Categoria</label>
        </div>
        <button @click="save">
          <ContentSaveIcon />
          Salvar
        </button>
      </div>
    </form>
  </div>
  <div class="row center">
    <table>
      <thead>
        <tr>
          <th>descricao</th>
          <th style="width: 10%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categoria in categorias" :key="categoria.id">
          <td>{{ categoria.descricao }}</td>
          <td>
            <DeleteIcon @click="deleteCategoria(categoria)" />
            <PencilIcon @click="editCategoria(categoria)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.form {
  margin-bottom: 1rem;
}

table {
  width: 50%;
  border-collapse: collapse;
  border: 1px solid #eee;
}

table tr {
  border-bottom: 1px solid #eee;
}

table td {
  padding: 0 0.5rem;
}

table td:last-child {
  text-align: center;
}

table tr:nth-child(even) {
  background-color: #eee;
}

thead {
  background-color: #dde;
  height: 2rem;
  font: 1em sans-serif;
}

header {
  justify-content: space-between;
  display: flex;
  align-items: center;
  height: 70px;
  background: #b6a7ff;
  
}

.esquerdo{
  margin-left: 20px;
  font-size: 30px;
}

strong{
  color: #600fab;
}


</style>
