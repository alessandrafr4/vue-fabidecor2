<script setup>
import { ref, reactive, onMounted } from 'vue'
import PlusBoxIcon from 'vue-material-design-icons/PlusBox.vue'
import ProdutoList from '@/components/ProdutoList.vue'
import Modal from '@/components/template/Modal.vue'

import temaService from '@/services/tema.js'
import categoriaService from '@/services/categoria.js'
import imageService from '@/services/images.js'
import produtoService from '@/services/produto.js'

const temas = ref([])
const categorias = ref([])
const coverUrl = ref('')
const file = ref(null)
const currentProduto = reactive({
  year: '',
  tema: '',
  categoria: '',
})

function onFileChange(e) {
  file.value = e.target.files[0]
  coverUrl.value = URL.createObjectURL(file.value)
}

async function save() {
  const image = await imageService.uploadImage(file.value)
  currentProduto.capa_attachment_key = image.attachment_key
  await produtoService.saveProduto(currentProduto)
  Object.assign(currentProduto, {
    id: '',
    year: '',
    tema: '',
    cover_attachment_key: ''
  })
  showForm.value = false
}

onMounted(async () => {
  let data = await temaService.getAllTemas()
  temas.value = data
})

onMounted(async () => {
  const data = await categoriaService.getAllCategorias()
  categorias.value = data
})

const showForm = ref(false)
</script>

<template>
  <div class="row">

    <header>
      <div class="esquerdo"> <strong> Produto </strong></div>
    </header> <button class="addButton" @click="showForm = true">
      <PlusBoxIcon />
      Adicionar
    </button>
  </div>
  <ProdutoList />
  <modal :visible="showForm" @close="showForm = false">
    <template #header>
      <h3>Cadastro de Produto</h3>
    </template>
    <template #body>
      <form class="form">
        <div class="row">
          <div id="preview">
            <input type="file" @change="onFileChange" />
            <div class="cover">
              <img v-if="coverUrl" :src="coverUrl" />
            </div>
          </div>
        </div>
        <div class="form-item">
          <input type="text" placeholder="Nome" id="nome" v-model="currentProduto.nome" />
          <label for="nome"> Nome</label>
        </div>
        <div class="form-item">
          <input type="number" placeholder="Quantidade" id="qtde" v-model="currentProduto.quantidade" />
          <label for="qtde">Quantidade</label>
        </div>
        <div class="form-item">
          <input type="number" placeholder="Preco" id="preco" v-model="currentProduto.preco" />
          <label for="preco">Preco</label>
        </div>
        <div class="form-item">
          <select v-model="currentProduto.tema">
            <option disabled value="">Selecione um Tema</option>
            <option v-for="tema in temas" :key="tema.id" :value="tema.id">
              {{ tema.nome }}
            </option>
          </select>
          <label for="year">Tema</label>
        </div>
        <div class="form-item">
          <select v-model="currentProduto.categoria">
            <option disabled value="">Selecione uma Categoria</option>
            <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
              {{ categoria.descricao }}
            </option>
          </select>
          <label for="year">Categoria</label>
        </div>


      </form>
    </template>
    <template #footer>
      <div class="footerButtons">
        <button @click="showForm = false">Cancelar</button>
        <button class="saveButton" @click="save">Salvar</button>
      </div>
    </template>
  </modal>
</template>

<style scoped>
.addButton,
.saveButton {
  height: 2rem;
  align-self: center;
  margin-left: 3rem;
  background-color: #080;
  color: white;
  justify-content: space-around;
}

.footerButtons {
  display: flex;
}

.form {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  row-gap: 0.5rem;

}

#preview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#preview .cover {
  width: 200px;
  height: 270px;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
}

#preview img {
  width: 200px;
  height: 270px;
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
