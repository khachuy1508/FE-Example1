<template>
  <div>
    <v-breadcrumbs
      :items="items"
      divider="-"
      class="breakcrumb"
    ></v-breadcrumbs>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        href: 'breadcrumbs_dashboard',
      },
      {
        text: 'Link 1',
        disabled: false,
        href: 'breadcrumbs_link_1',
      },
      {
        text: 'Link 2',
        disabled: true,
        href: 'breadcrumbs_link_2',
      },
    ],
  }),
}
</script>
<style scoped lang="scss">
.breakcrumb {
  justify-content: center;
}
</style>
