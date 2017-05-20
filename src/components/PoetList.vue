<template>
  <div class="poetList">
    <h4>Some of my favorites</h4>
    <ul>
      <li v-for="favorite in favorites"><h5>{{ favorite }} </h5></li>
    </ul>
  </div>
</template>

<script>
 export default {
   name: 'poetList',
   data () {
     return {
       favorites: [
         'Henry David Thoreau',
         'Lewis Carroll',
         'Ralph Waldo Emerson',
         'Alexander Pope',
         'Emily Dickinson'
        ]
     }
   }
 }
</script>
<style>
  h4 {
    color: #42b983;
  }
</style>
