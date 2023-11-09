<template>
  <div class="modal-container">
    <div class="modal-body">
      <div class="title">
        <label>Informações</label>
      </div>
      <ul>
  <li><strong>Passos:</strong> Refere-se aos passos dados nas últimas 24 horas.</li>
  <li><strong>Move min:</strong> Indica o maior tempo contínuo em movimento.</li>
  <li><strong>Distância:</strong> Indica a distância percorrida em milhas durante o período especificado.</li>
  <li><strong>Calorias:</strong> Representa a quantidade de calorias gastas no decorrer do dia.</li>
  <li><strong>TMB:</strong> Representa a Taxa de Metabolismo Basal, que é a quantidade mínima de energia necessária para sustentar as funções vitais do organismo em repouso.</li>
  <li><strong>Água por dia:</strong> Representa a quantidade ideal de consumo de água por dia com base no seu peso.</li>
</ul>
      <div class="modal-action">
        <button class="modal-button" @click="emit('confirm')">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineEmits } from 'vue'
  const emit = defineEmits(['confirm'])
</script>

<style scoped>

  .title{
    text-align: center;
    margin-bottom: 1.5em;
    font-size: 1.1em;
    padding: 0.2em;
    width: 20em;
    border-radius: 40px;
    color: #fff;
    background-color: rgb(9, 80, 112);
  }
  .modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #cececeb5;
  }
  .modal-body {
    background-color: #fff;
    border: 2px solid rgba(9, 79, 112, 0.445);
    border-radius: 10px;
    text-align: start;
    padding: 20px 30px;
    font-size: small;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .modal-action {
    display: flex;
    flex-direction: row;
    gap: 40px;
    justify-content: center;
  }
  .modal-button {
    cursor: pointer;
    height: 30px;
    padding: 0 25px;
    border: 2px solid rgb(9, 80, 112);
    border-radius: 5px;
    background-color: rgb(9, 80, 112);
    color: #fff;
  }

</style>
