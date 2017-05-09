<template>
  <div class="search">
    <ul>
      <li>Home</li>
      <li>See poem</li>
      <li>Start over</li>
    </ul>
    <div class="mdl-grid">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--12-col-phone mdl-cell--4-offset-desktop mdl-cell--1-offset-tablet">
          <input class="mdl-textfield__input" type="text" id="search-poem" pattern="[A-Z,a-z, ]*">
          <label class="mdl-textfield__label" for="search-poem">Search by title or author</label>
          <span class="mdl-textfield__error">Letters and spaces only</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.mdl-grid {
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
