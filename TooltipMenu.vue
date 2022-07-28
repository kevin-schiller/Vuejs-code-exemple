<template>
  <div class="actionMenu">
    <button @click="toggleTooltip" class="tooltipBtn" :aria-expanded="isOpen"><img src="../../assets/img/icons/dot.svg" alt=""></button>
    <div class="myList">
      <ul>
        <li class="tooltipOption" v-for="(choice, i) in choices" :key="i+`${uuid}`">

          <router-link :to="`${path}${'?action='+choice.Nom.replaceAll(' ', '')}`">{{ choice.Nom }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TooltipMenu",
  props: {
    choices: { type: Array, required: true },
    path: { type: String, required: false},
    type: {type: String, required: false}
  },
  data(){
    return{
      isOpen : false,
    }
  },
  methods: {
    selectedObj: function(e) {
      return this.choices.find(item => item.Id == e.target.value);
    },

    toggleTooltip: function(e) {
      this.isOpen = !this.isOpen;
    },

    handleClickOutside : function(event){
       if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    }

  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    },
  unmounted() {
      document.removeEventListener("click", this.handleClickOutside);
    },
};
</script>

<style src="./TooltipMenu.scss" lang="scss" scoped></style>
