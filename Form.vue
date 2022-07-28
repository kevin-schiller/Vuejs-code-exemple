<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <FormInput
        v-model="item.brand"
        label="Marque"
        placeholder="Marque du véhicule"
        :errorMsg="violations.brand"
        required
      />
      <FormInput
        v-model="item.model"
        label="Modèle"
        placeholder="Modèle du véhicule"
        :errorMsg="violations.model"
        required
      />
      <FormInput
        v-model="item.licensePlate"
        label="Plaque d'immatriculation"
        placeholder="Numéro de plaque"
        :errorMsg="violations.licensePlate"
        required
      />
      <FormInput
        v-model="item.licenseNumber"
        label="License"
        placeholder="Numéro de license"
        :errorMsg="violations.licenseNumber"
        required
      />
      <FormInput
        v-model="item.truckCard"
        label="Carte carburant"
        placeholder="Numéro de la carte carburant"
        :errorMsg="violations.truckCard"
      />
      <FormInput
        v-model="item.kilometersNumber"
        type="number"
        label="Nombre de kilomètres"
        placeholder="Nombre de kilomètres"
        :errorMsg="violations.kilometersNumber"
        required
      />
    </div>
    <div class="validation-button">
      <custom-button
        :text="initialValues != null ? 'Modifier le véhicule' : 'Ajouter le véhicule'"
        type="submit"
        class="btn btn-secondary md"
      ></custom-button>
    </div>
  </form>
</template>

<script>
import { find, get, isUndefined } from "lodash";
import FormInput from "@/components/Form/FormInput.vue";
import CustomButton from "@/components/Button/CustomButton.vue";

export default {
  components: {
    FormInput,
    CustomButton,
  },

  props: {
    handleSubmit: {
      type: Function,
      required: true,
    },

    values: {
      type: Object,
      required: true,
    },

    errors: {
      type: Object,
      default: () => {},
    },

    initialValues: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    item() {
      return this.initialValues || this.values;
    },

    violations() {
      console.log(this.errors);

      return this.errors || {};
    },
  },

  methods: {
    isSelected(collection, id) {
      return find(this.item[collection], ["id", id]) !== undefined;
    },

    isValid(key) {
      return isUndefined(get(this.violations, key));
    },
  },
};
</script>