<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Ed Tech </v-list-item-title>
          <v-list-item-subtitle> Módulo Acadêmico </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-group :value="true" prepend-icon="mdi-account-circle">
          <template v-slot:activator>
            <v-list-item-title>Aluno</v-list-item-title>
          </template>

          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Registro do Aluno</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="item in items"
              :key="item.id"
              :to="item.to"
              link
            >
              <v-list-item-title v-text="item.title"></v-list-item-title>

              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,

    items: [
      {
        id: 1,
        title: "Adicionar",
        icon: "mdi-account-plus",
        to: "/add-student",
      },
      {
        id: 2,
        title: "Lista",
        icon: "mdi-format-list-bulleted",
        to: "/",
      },
    ],
  }),
};
</script>
