<template>
  <!-- <list-student-table v-bind:students="dataestudante" /> -->
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="searchValue"
            label="Digite o Nome ou RA"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-select
            :items="items"
            :hint="`${searchKey.ch}, ${searchKey.va}`"
            item-text="ch"
            item-value="va"
            v-model="searchKey"
            label="Buscar pelo.."
            clearable
            return-object
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-btn
            @click="submitSerch"
            class="mt-3"
            small
            fab
            dark
            color="indigo"
          >
            <v-icon dark> mdi-magnify </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="3">
          <v-btn to="add-student" depressed color="primary"
            >Adicionar Aluno</v-btn
          >
        </v-col>
      </v-row>
    </v-form>

    <!-- tables -->
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">RA</th>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">CPF</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataestudante" :key="item.ra">
            <td>{{ item.ra }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.cpf }}</td>
            <td class="text-center">
              <!-- buttons actions -->
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <router-link :to="{ name: 'add', params: { ra: item.ra } }">
                    <v-btn v-bind="attrs" v-on="on" class="mr-2" depressed>
                      <v-icon color="#A8BDFD">{{ editIcon }}</v-icon>
                    </v-btn>
                  </router-link>
                </template>
                <span>Editar</span>
              </v-tooltip>
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="removeStundent(item.ra)"
                    v-bind="attrs"
                    v-on="on"
                    depressed
                  >
                    <v-icon color="#C65E7A">{{ deleteIcon }}</v-icon>
                  </v-btn>
                </template>
                <span>Apagar</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import StudentService from "../services/StudentService";

export default Vue.extend({
  name: "listHome",

  data() {
    return {
      dataestudante: [
        {
          ra: "",
          name: "",
          email: "",
          cpf: "",
        },
      ],
      deleteIcon: "mdi-delete",
      editIcon: "mdi-pencil",
      searchKey: "",
      searchValue: "",
      items: ["ra", "name", "email", "cpf"],
    };
  },
  methods: {
    async listAll() {
      const response = await StudentService.getAllStudent();
      this.dataestudante = response;
    },
    async submitSerch() {
      if (this.searchKey !== "" || this.searchValue !== "") {
        this.searchCuston(this.searchKey, this.searchValue);
      }
    },

    async searchCuston(keyValue: string, value: string) {
      const response = await StudentService.getSearchAll(keyValue, value);
      console.log(`${keyValue} - ${value}`);

      this.dataestudante = response;
    },

    async removeStundent(ra: string) {
      this.$swal({
        title: "Você tem certeza que deseja remover o cadastro do aluno?",
        text: "Atenção! O cadastro deste aluno será excluído!",
        icon: "warning",
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim! Deletar!",
      }).then(async (result) => {
        if (result.value) {
          await StudentService.deleteStudent(ra);
          this.$swal("Deletado", "Deletado com sucesso", "success");
          this.listAll();
        } else {
          this.$swal("Cancelado", "Estudante não deletado", "info");
        }
      });
    },
  },
  mounted() {
    this.listAll();
  },
});
</script>
