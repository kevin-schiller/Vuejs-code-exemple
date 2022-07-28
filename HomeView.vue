<template>
  <div class="home-page">
    <div class="buttons-container">
      <div class="filters-container">
        <FormSelect
          v-model="inputData.searchBy"
          :choices="searchByList"
          placeholder="Rechercher par"
          :value="inputData.searchBy"
          label="Rechercher par :"
        />
        <FormInput
          v-model="inputData.inputSearch"
          label="rechercher"
          placeholder="Rechercher"
          type="text"
          @input="quickSearch"
        />
      </div>
      <CustomButton
        text="Ajouter une journée"
        type="add"
        class="btn btn-secondary md"
        :to="{ name: 'DayRoutineCreate' }"
      ></CustomButton>
    </div>
    <main class="day-routine-table">
      <div v-if="isLoading" class="alert alert-info">Loading...</div>

      <CustomTable
        v-if="data"
        :theData="data"
        :config="config"
        :sortBy="this.inputData.orderBy"
        :sortDir="this.inputData.orderDir"
        @newOrder="reorder"
        type="dayRoutine"
      />
      <div v-if="dataInfo">
        <pagination
          v-if="dataInfo['hydra:last']"
          :nbPages="
            dataInfo['hydra:last']
              ? dataInfo['hydra:last'].split('page')[1].replace(/\D/g, '')
              : ''
          "
          :currentPage="
            dataInfo['@id']
              ? dataInfo['@id'].split('page')[1].replace(/\D/g, '')
              : ''
          "
          :nbResults="dataInfo['hydra:totalItems']"
          @getPage="getUsers"
          :nbBullet="10"
          :currentQuery="filterQuery"
        ></pagination>
      </div>
    </main>
  </div>
</template>

<script>
import CustomTable from "@/components/CustomTable/CustomTable.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import FormSelect from "@/components/Form/FormSelect.vue";
import FormInput from "@/components/Form/FormInput.vue";
import CustomButton from "@/components/Button/CustomButton.vue";
import api from "@/classes/api/Api";

export default {
  components: {
    CustomTable,
    Pagination,
    FormSelect,
    FormInput,
    CustomButton
  },

  data: () => ({
    inputData: {
      orderBy: "updatedAt",
      orderDir: false,
      searchBy: "user.fullname",
      inputSearch: "",
    },

    isLoading: true,

    data: null,
    dataInfo: null,

    token: null,

    searchByList: [
      {
        Id: "user.fullname",
        Nom: "Nom",
      },
      {
        Id: "car.brand",
        Nom: "Marque",
      },
      {
        Id: "car.model",
        Nom: "Modèle",
      },
      {
        Id: "car.licensePlate",
        Nom: "Plaque d'immatriculation",
      },
    ],

    config: [
      {
        key: "updatedAt",
        Nom: "Date",
        isSortable: true,
      },
      {
        key: "user",
        Nom: "Livreur",
        property: "user.fullname",
        isSortable: true,
      },
      {
        key: "car",
        Nom: "Véhicule",
        property: "car.brand",
        isSortable: true,
      },
      {
        key: "car",
        Nom: "Plaque d'immatriculation",
        property: "car.licensePlate",
        isSortable: true,
      },
      {
        key: "kilometersNumber",
        Nom: "Kilomètres du véhicule",
        isSortable: true,
      },
      {
        key: "kilometersTraveled",
        Nom: "Distance parcourus (km)",
        isSortable: true,
      },
      {
        key: "Actions",
        Nom: "Actions",
      },
    ],
  }),

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },

    filterQuery() {
      let query = "?";

      query +=
        "order%5B" +
        this.inputData.orderBy +
        "%5D=" +
        (this.inputData.orderDir === true ? "asc" : "desc");

      query += this.inputData.inputSearch
        ? "&" + this.inputData.searchBy + "=" + this.inputData.inputSearch
        : "";

      // query += this.inputData.IdRegion
      //   ? "&IdRegion=" + this.inputData.IdRegion
      //   : "";

      // query += this.inputData.IdMagasin
      //   ? "&IdMagasin=" + this.inputData.IdMagasin
      //   : "";

      // query += this.inputData.IdEtat ? "&IdEtat=" + this.inputData.IdEtat : "";

      // query += this.inputData.etranger
      //   ? "&SalarieEtranger=" + this.inputData.etranger
      //   : "";

      // query += "&ItemsPerPage=" + this.nbItemsByPage;

      return query;
    },
  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.fetchByFilters();
  },

  created() {},

  methods: {
    getDayRoutines(query = "") {
      api.getDayRoutines(query).then((response) => {
        console.log(response.data["hydra:member"]);
        this.data = response.data["hydra:member"];
        this.dataInfo = response.data["hydra:view"];
        this.isLoading = false;
      });
    },

    fetchByFilters() {
      this.getDayRoutines(this.filterQuery);
    },

    quickSearch(event) {
      if (event.target.value.length >= 3) {
        console.log("letsGo");
        this.fetchByFilters();
      } else if (event.target.value.length === 0) {
        this.getDayRoutines();
      }
    },

    reorder(property) {
      console.log(property);
      console.log(this.inputData.orderBy);
      if (property === this.inputData.orderBy) {
        this.inputData.orderDir = !this.inputData.orderDir;
      } else {
        this.inputData.orderDir = false;
        this.inputData.orderBy = property;
      }
      this.fetchByFilters();
    },
  },
};
</script>

<style lang="scss">
@import "./HomeView.scss";
</style>
