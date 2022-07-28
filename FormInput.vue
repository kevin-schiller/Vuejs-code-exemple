<template>
  <div class="CustomInput">
    <div class="inputColumn">
      <label
        :class="`label ${required ? 'required' : ''}`"
        :for="`input${uuid}`"
        v-if="label"
      >
        {{ label }}</label
      >
      <div class="inputMsgContainer">
        <input
          :type="type"
          :required="required"
          :class="` ${status} ${classes}`"
          :id="`input${uuid}`"
          :list="datalist ? `list${uuid}` : null"
          :invalid="errorMsg !== null"
          :pattern="pattern"
          :maxlength="maxlength"
          :placeholder="placeholder"
          :value="modelValue"
          :max="max"
          :min="min"
          :disabled="disabled"
          @keypress="$emit('keypress', $event)"
          @blur="$emit('blur', $event.target.value)"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <datalist v-if="datalist" :id="`list${uuid}`">
          <option v-for="data in datalist" :key="data.Id" :value="data.Nom" />
        </datalist>
        <p v-if="errorMsg !== null" class="errorMsg inputError">
          {{ errorMsg }}
        </p>
      </div>
    </div>
    <div class="tooltipContainer" v-if="infoBulle">
      <img src="../../assets/img/icons/info.svg" class="requiredIcon" />
      <p class="infoBulle">{{ infoBulle }}</p>
    </div>
    <img
      v-else-if="status === 'valid'"
      src="../../assets/img/icons/check-solid.svg"
      class="validIcon"
    />
    <img
      v-else-if="status === 'error'"
      src="../../assets/img/icons/close.svg"
      class="errorIcon"
    />
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "FormInput",
  props: {
    infoBulle: { type: String, default: null },
    errorMsg: { type: String, default: null },
    modelValue: { type: [String, Number, Object, null], required: true },
    required: { type: Boolean, default: false },
    pattern: { type: String, required: false, default: null },
    maxlength: { type: String, required: false, default: null },
    type: { type: String, default: "text" },
    label: { type: String, required: true },
    placeholder: { type: String, default: null },
    classes: { type: String, default: "" },
    datalist: { type: Array, default: null },
    status: { type: String, default: "" },
    max: { type: String, default: "" },
    min: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
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
      console.log(this.errorMsg)
      return this.initialValue != this.modelValue;
    },
  },
};
</script>

<style src="./FormInput.scss" lang="scss" scoped></style>
