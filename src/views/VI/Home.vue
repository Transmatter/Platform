<template>
    <div class="drawer drawer-end">
  <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content w-full">
    <!-- Page content here -->
    <label for="my-drawer-4" class="drawer-button btn btn-primary">Open drawer</label>
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-4" class="drawer-overlay"></label>
    <ul class="menu p-4 overflow-y-auto w-4/5 bg-base-100 text-base-content">
      <!-- Sidebar content here -->
      <li class="h-1/5"><a>Sidebar Item 1</a></li>
      <li class="h-1/5"><a>Sidebar Item 2</a></li>
       <li class="h-3/5"><a>Sidebar Item 3</a></li>
    </ul>
  </div>
</div>

</template>

<style scoped>
</style>