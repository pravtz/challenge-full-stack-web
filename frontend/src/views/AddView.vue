<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-col sm="7">
        <v-text-field
          v-model="studentObj.name"
          label="Name"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="studentObj.email"
          label="E-mail"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="studentObj.cpf"
          v-mask="'###.###.###-##'"
          :rules="cpfRules"
          label="cpf"
          required
        ></v-text-field>
        <v-btn class="mr-4" @click="submit" :disabled="!valid"> Enviar </v-btn>
        <v-btn @click="clear"> Limpar </v-btn>
      </v-col>
    </v-form>
  </v-container>
</template>

<script>
import Vue from "vue";
import { mask } from "vue-the-mask";
import StudentService from "../services/StudentService";
import { validedDocumentCpf } from "@/utils/validedDocumentCpf";

export default Vue.extend({
  directives: { mask },
  data: () => {
    return {
      valid: true,
      nameRules: [
        (v) => !!v || "O nome é obrigatório!",
        // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      emailRules: [
        (v) => !!v || "O e-mail é obrigatório!",
        (v) => /.+@.+\..+/.test(v) || "O e-mail precisa ser valido!",
      ],
      cpfRules: [
        (v) => !!v || "O CPF é obrigatório!",
        (v) =>
          /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/.test(v) ||
          "O CPF precisa conter todos os digitos!",
        (v) => validedDocumentCpf(v) || "O CPF precisa ser valido!",
      ],
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
      const resValidate = this.$refs.form.validate();

      this.isSubmitted = false;
      console.log(this.studentObj);
      //this.$v.$touch();
      if (!resValidate) {
        this.$swal({
          title: "Preencha corretamente os campos!",
          icon: "error",
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEnterKey: true,
          allowEscapeKey: false,
        });
        return;
      }
      const validEmailAndCpf = await StudentService.existEmailAndCpf(
        this.studentObj.email,
        this.studentObj.cpf
      );
      if (validEmailAndCpf.isCpf) {
        this.$swal({
          title: "Este CPF já possue cadastrado em nosso sistema!",
          icon: "error",
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEnterKey: true,
          allowEscapeKey: false,
        });
        return;
      }
      if (validEmailAndCpf.isEmail) {
        this.$swal({
          title: "Este email já existe cadastrado em nosso sistema!",
          icon: "error",
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEnterKey: true,
          allowEscapeKey: false,
        });
        return;
      }
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
