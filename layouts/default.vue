<template>
  <div id="page-container">
    <nav class="navbar header has-shadow is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <h3 class="title page-title">Emoji Builder</h3>
        </a>

        <!-- <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>-->
      </div>
    </nav>

    <section class="main-content columns">
      <div class="column is-2"></div>
      <div class="container column is-8">
        <nuxt />
      </div>
      <div class="column is-2"></div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Emoji Builder</strong> by
          Patrick.
        </p>

      </div>

      <div class="content has-text-centered">
        <div class="credits center"><p>Copyright ©2006-{{new Date().getFullYear()}} | <n-link to="/privacy">Privacy Policy</n-link> | <n-link to="/sitemap">Sitemap</n-link> | <n-link to="/about">About</n-link></p></div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Home",
          icon: "home",
          to: { name: "index" }
        },
        {
          title: "Inspire",
          icon: "lightbulb",
          to: { name: "inspire" }
        }
      ]
    };
  }
};
</script>

<style lang="scss" >
.page-title {
  color: white;
}
.main-content {
  margin-top: 2rem;
}

#page-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

html, body, #__nuxt, #__layout {
  height: 100%;
  margin: 0;
}

.main-content {
    flex: 1 0;
}

.footer {
  flex: 0 1;
}

</style>
