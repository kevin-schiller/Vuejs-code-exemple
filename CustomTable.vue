<template>
  <table v-if="theData.length > 0" class="customTable">
    <thead>
      <tr>
        <th v-for="conf in config" :key="conf.key">
          <button v-if="conf.isSortable" @click="sort(conf.key, conf.property)">
            <span v-if="conf.isSortable" class="sr-only">Trier par </span>
            {{ conf.Nom }}
            <img
              v-if="sortBy !== conf.key"
              src="@/assets/img/icons/sort-solid.svg"
              alt=""
            />
            <img
              v-if="sortBy == conf.key && sortDir === true"
              src="@/assets/img/icons/sort-desc.svg"
              alt=""
            />
            <img
              v-if="sortBy == conf.key && sortDir === false"
              src="@/assets/img/icons/sort-asc.svg"
              alt=""
            />
          </button>
          <span v-else> {{ conf.Nom }} </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in theData" :key="row.id">
        <td
          v-for="(conf, idx) in config"
          :key="idx"
          :class="{
            actions: conf.key === 'Actions',
          }"
        >
          <span class="mobile-title">{{ conf.Nom }} : </span>
          <div class="cellContainer">
            <span v-if="(typeof row[conf.key] !== 'object')">
              {{
                isDate(conf.Nom)
                  ? Utils.formateDate(row[conf.key])
                  : row[conf.key]
              }}</span
            >
            <div v-else>
              <span v-if="conf.Nom === 'Livreur'">{{
                row[conf.key][0]["fullname"]
              }}</span>
              <span v-else-if="conf.Nom === 'Véhicule'">{{
                row[conf.key][0]["brand"] + " " + row[conf.key][0]["model"]
              }}</span>
              <span v-else-if="conf.Nom === 'Plaque d\'immatriculation'">{{
                row[conf.key][0]["licensePlate"]
              }}</span>
            </div>
            <tooltip-menu
              v-if="conf.key === 'Actions'"
              :choices="actions"
              :path="getPath(row.id)"
            ></tooltip-menu>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else>Aucune demande ne correspond a votre recherche</p>
</template>

<script>
import Utils from "@/classes/utils/utils";
import TooltipMenu from "@/components/TooltipMenu/TooltipMenu.vue";

export default {
  components: {
    TooltipMenu,
  },

  props: ["theData", "config", "sortBy", "sortDir", "type"],
  emits: ["newOrder"],

  data() {
    return {
      showPop: "",
      Utils: Utils,
      actions: [
        { Id: "edit", Nom: "Editer" },
        { Id: "show", Nom: "Voir" },
      ],
    };
  },

  methods: {
    toggleMag() {
      this.showPop = !this.showPop;
    },
    isDate: function (dataKey) {
      return dataKey.includes("Date");
    },
    sort(order, name) {
      if (order === "user" || order === "car") {
        this.$emit("newOrder", name);
      } else {
        this.$emit("newOrder", order);
      }
    },
    getPath(id = "") {
      let path;
      switch (this.type) {
        case "dayRoutine":
          path = `/day_routines/${id}`;
          break;
        case "user":
          path = `/users/${id}`;
          break;
        case "admin":
          path = `/admins/${id}`;
          break;
        case "car":
          path = `/cars/${id}`;
          break;
      }
      return path;
    },
  },
};
</script>

<style lang="scss" src="./CustomTable.scss" scoped></style>
