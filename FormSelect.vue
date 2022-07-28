<template>
  <div class="selectContainer">
    <label
      :class="`label ${required ? 'required' : ''}`"
      :for="`select${uuid}`"
      v-if="label"
      >{{ label }}</label
    >
    <div>
      <select
        :required="required"
        :name="`select${uuid}`"
        :id="`select${uuid}`"
        @input="$emit('update:modelValue', $event.target.value)"
        :disabled="disabled"
        :invalid="errorMsg !== null && !hasChanged"
      >
        <option
          v-for="(choice, i) in choices"
          :key="i"
          :value="choice.Id"
          :selected="choice.Id == modelValue"
        >
          {{ choice.Nom }}
        </option>
      </select>
      <p v-if="errorMsg !== null && !hasChanged" class="errorMsg inputError">
        {{ errorMsg }}
      </p>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  props: {
    modelValue: { type: [String, Number, null], required: true },
    choices: { type: Array, required: true },
    label: { type: String, default: null },
    placeholder: { type: String, default: null },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    classes: { type: String, default: "" },
    errorMsg: { type: String, default: null },
  },
  data() {
    return {
      initialValue: this.modelValue,
      uuid: null,
    };
  },
  mounted() {
    this.uuid = uuidv4();
  },
  computed: {
    hasChanged: function () {
      return this.initialValue != this.modelValue;
    },
  },
};
</script>

<style src="./FormSelect.scss" lang="scss" scoped></style>
