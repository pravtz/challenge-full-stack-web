<template>
  <v-container>
    <form>
      <v-col sm="7">
        <v-text-field v-model="studentObj.name" label="Name"></v-text-field>
        <v-text-field v-model="studentObj.email" label="E-mail"></v-text-field>
        <v-text-field v-model="studentObj.cpf" label="cpf"></v-text-field>
        <v-btn class="mr-4" @click="submit"> Enviar </v-btn>
        <v-btn @click="clear"> Limpar </v-btn>
      </v-col>
    </form>
  </v-container>
</template>

<script>
import Vue from "vue";
import StudentService from "../services/StudentService";

export default Vue.extend({
  data: () => {
    return {
      studentObj: {
        name: "",
        email: "",
        cpf: "",
      },
    };
  },

  methods: {
    async getStudentRA() {
      const { ra } = await this.$route.params;
      const response = await StudentService.getStudentRA(ra);
      this.studentObj = { ...response };
    },
    async add() {
      this.isSubmitted = true;
      console.log(this.studentObj);
      //this.$v.$touch();
      const res = await StudentService.createStudent(this.studentObj);
      if (res.ra) {
        this.$swal({
          title: "Aluno Cadastrado com sucesso!",
          icon: "success",
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEnterKey: true,
          allowEscapeKey: false,
        }).then(() => {
          this.$router.push({
            name: "list",
          });
        });
      } else {
        this.$swal({
          title: "Oops! Erro!",
          icon: "error",
          text: "Erro em cadastrar o aluno! Tente mais tarde ou entre em contato conosco!",
          showConfirmButton: true,
          allowOutsideClick: true,
          allowEnterKey: true,
          allowEscapeKey: false,
        }).then(() => {
          this.$router.push({
            name: "list",
          });
        });
      }
    },
    async update() {
      const { ra } = await this.$route.params;
      const { name, email, cpf } = this.studentObj;
      const res = await StudentService.updateStudent(ra, {
        name,
        email,
        cpf,
      });
      if (res.ra) {
        this.$swal({
          title: "Aluno atualizado com sucesso!",
          icon: "success",
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEnterKey: true,
          allowEscapeKey: false,
        }).then(() => {
          this.$router.push({
            name: "list",
          });
        });
      } else {
        this.$swal({
          title: "Oops! Erro!",
          icon: "error",
          text: "Erro ao atualizar o cadastro! Tente mais tarde ou entre em contato conosco!",
          showConfirmButton: true,
          allowOutsideClick: true,
          allowEnterKey: true,
          allowEscapeKey: false,
        }).then(() => {
          this.$router.push({
            name: "list",
          });
        });
      }
    },

    async submit() {
      if (this.$route.params.ra) {
        this.update();
        return;
      }
      this.add();
    },
    clear() {
      //this.$v.$reset();
      this.studentObj.name = "";
      this.studentObj.email = "";
      this.studentObj.cpf = "";
    },
  },
  mounted() {
    if (this.$route.params.ra) {
      this.getStudentRA();
    }
  },
});
</script>
