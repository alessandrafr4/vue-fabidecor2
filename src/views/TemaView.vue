<script setup>
import { ref, onMounted } from 'vue'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import ContentSaveIcon from 'vue-material-design-icons/ContentSave.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'

import temaService from '@/services/tema.js'

const temas = ref([])
const currentTema = ref({
  name: ''
})

onMounted(async () => {
  const data = await temaService.getAllTemas()
  temas.value = data
})

async function save() {
  await temaService.saveTema(currentTema.value)
  const data = await temaService.getAllTemas()
  temas.value = data
  currentTema.value = { name: '' }
}

async function deleteTema(tema) {
  await temaService.deleteTema(tema)
  const data = await temaService.getAllTemas()
  temas.value = data
} 

function editTema(tema) {
  currentTema.value = { ...tema }
}
</script>

<template>
<header>
    <div class="esquerdo">  <strong> Tema </strong></div>
  </header>
  <div class="row center">
    <form class="form">
      <div class="row">
        <div class="row form-item">
          <input type="text" placeholder="Tema" v-model="currentTema.nome" @keyup.enter="save" />
          <label for="">Tema</label>
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
        <tr v-for="tema in temas" :key="tema.id">
          <td>{{ tema.nome }}</td>
          <td>
            <DeleteIcon @click="deleteTema(tema)" />
            <PencilIcon @click="editTema(tema)" />
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
